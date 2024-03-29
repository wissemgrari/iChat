package com.wissem.chat;

import com.wissem.config.JwtService;
import com.wissem.exception.ChatNotFoundException;
import com.wissem.exception.UserNotFoundException;
import com.wissem.message.Message;
import com.wissem.message.MessagePreviewDTOMapper;
import com.wissem.message.MessageRepository;
import com.wissem.user.User;
import com.wissem.user.UserDTOMapper;
import com.wissem.user.UserRepository;
import com.wissem.user_chat.UserChat;
import com.wissem.user_chat.UserChatId;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ChatService {
  
  private final ChatRepository chatRepository;
  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final UserDTOMapper userDTOMapper;
  private final MessagePreviewDTOMapper messagePreviewDTOMapper;
  private final MessageRepository messageRepository;
  
  public ResponseEntity<ChatResponse> getAllChats(HttpServletRequest request) {
    try {
      
      // extract the logged-in user from the token
      String token = jwtService.getTokenFromCookie(request);
      String username = jwtService.extractUsername(token);
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UserNotFoundException(
          "No user " + "associated with this email address: " + username));
      
      // check if the user have chats
      // IF YES: return them
      // IF NO: return null
      List<ChatDTO> chats = chatRepository.findChatsByUser(user.getId());
      
      // initialize the response array that will hold the list of ChatResponse
      List<ChatResponse> response = new ArrayList<>();
      
      // extract the users ID's from the chats, then retrieve their data
      for (ChatDTO chat : chats) {
        
        // get the latest message foreach chat to use it for preview
        Message msgPreview =
          messageRepository.findLatestMessageByChatId(chat.getId()).orElse(null);
        
        response.add(ChatSuccessResponse
          .builder()
          .id(chat.getId())
          .createdAt(chat.getCreated_at())
          .user1(userDTOMapper.apply(Objects.requireNonNull(
            userRepository.findById(chat.getUser1()).orElse(null))))
          .user2(userDTOMapper.apply(Objects.requireNonNull(
            userRepository.findById(chat.getUser2()).orElse(null))))
          .msgPreview(
            msgPreview != null ? messagePreviewDTOMapper.apply(msgPreview) : null)
          .build());
      }
      
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(ChatListResponse.builder().chats(response).build());
    }
    catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(ChatErrorResponse.builder().error(e.getMessage()).build());
    }
  }
  
  public ResponseEntity<ChatResponse> create(HttpServletRequest request,
                                             CreateChatRequest requestBody) {
    try {
      String userId = requestBody.userId();
      // check if there's a participant with the given id
      User participant = userRepository
        .findById(Long.parseLong(userId))
        .orElseThrow(
          () -> new UserNotFoundException("There's no user with such id: " + userId));
      
      // extract the logged-in user from the token
      String token = jwtService.getTokenFromCookie(request);
      String username = jwtService.extractUsername(token);
      
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException(
          "No user " + "associated with this email address: " + username));
      
      // check if there's an existing chat with the user
      if (chatRepository.existsChatByUsers(user.getId(), participant.getId())) {
        ChatDTO chat = chatRepository.findChatByUsers(user.getId(), participant.getId());
        return ResponseEntity
          .status(HttpStatus.OK)
          .body(ChatExistResponse
            .builder()
            .message("The chat is already exist")
            .chat(chat)
            .build());
      }
      
      // prevent the user to create a chat with him-self
      if (user.getId().equals(Long.parseLong(userId))) {
        return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(ChatErrorResponse
            .builder()
            .error("Unable to create a chat with yourself")
            .build());
      }
      
      Chat newChat = chatRepository.save(new Chat());
      
      UserChat newUserChat = new UserChat();
      UserChatId userChatId = new UserChatId(newChat.getId(), user.getId());
      newUserChat.setId(userChatId);
      newUserChat.setUser(user);
      newUserChat.setParticipant(participant.getId());
      newUserChat.setChat(newChat);
      
      user.getUserChats().add(newUserChat);
      userRepository.save(user);
      
      return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(ChatSuccessResponse
          .builder()
          .id(newChat.getId())
          .createdAt(newChat.getCreated_at())
          .user1(userDTOMapper.apply(user))
          .user2(userDTOMapper.apply(participant))
          .build());
    }
    catch (Exception e) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(ChatErrorResponse.builder().error(e.getMessage()).build());
    }
  }
  
  public ResponseEntity<ChatResponse> remove(String chatId) {
    try {
      
      Long id = Long.parseLong(chatId);
      Chat chat = chatRepository
        .findChatById(id)
        .orElseThrow(() -> new ChatNotFoundException(
          "Unable to find the " + "chat " + "with the given id"));
      
      chatRepository.delete(chat);
      
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(ChatDeletedResponse
          .builder()
          .id(id)
          .message("The chat with id: " + id + " has been deleted")
          .build());
    }
    catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(ChatErrorResponse.builder().error(e.getMessage()).build());
    }
  }
  
}
