package com.wissem.message;

import com.wissem.chat.Chat;
import com.wissem.chat.ChatRepository;
import com.wissem.config.JwtService;
import com.wissem.exception.ChatNotFoundException;
import com.wissem.user.User;
import com.wissem.user.UserDTOMapper;
import com.wissem.user.UserRepository;
import com.wissem.user_chat.UserChat;
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
public class MessageService {
  
  private final MessageRepository messageRepository;
  private final ChatRepository chatRepository;
  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final UserDTOMapper userDTOMapper;
  
  
  public ResponseEntity<MessageResponse> getMessages(HttpServletRequest request,
                                                     String chatID) {
    try {
      
      // check if there's a chat with the given id
      Chat chat = chatRepository
        .findChatById(Long.parseLong(chatID))
        .orElseThrow(
          () -> new ChatNotFoundException("No chat associated with id: " + chatID));
      
      // extract the logged-in user from the token
      String token = jwtService.getTokenFromCookie(request);
      String username = jwtService.extractUsername(token);
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException(
          "No user associated with this email address: " + username));
      
      // make sure that the logged-in user is a member of the request chat
      boolean isMember = chat
        .getUserChats()
        .stream()
        .anyMatch(userChat -> Objects.equals(userChat.getUser().getId(), user.getId()) ||
          Objects.equals(userChat.getParticipant(), user.getId()));
      
      if (!isMember) {
        throw new Exception(
          "Your not eligible to do such action since your not a member of the chat");
      }
      
      // get the participant object
      Long id = chat.getUserChats()
        .stream()
        .filter(uc -> !Objects.equals(uc.getUser().getId(), user.getId()))
        .findFirst()
        .map(uc -> uc.getUser().getId())
        .orElseGet(() -> chat.getUserChats()
          .stream()
          .findFirst()
          .map(UserChat::getParticipant)
          .orElse(null));
      
      User participant = userRepository.findById(id).orElse(null);
      
      List<Message> messages = chat.getMessages();
      
      List<MessageResponse> response = new ArrayList<>();
      
      for (Message message : messages) {
        response.add(new MessageResponseMapper().apply(message));
      }
      
      assert participant != null;
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(MessageListResponse
          .builder()
          .user(userDTOMapper.apply(user))
          .participant(userDTOMapper.apply(participant))
          .messages(response)
          .build());
      
    }
    catch (Exception e) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(MessageErrorResponse.builder().error(e.getMessage()).build());
    }
  }
  
  public ResponseEntity<MessageResponse> sendMessage(HttpServletRequest request,
                                                     String chatID,
                                                     MessageRequest message) {
    try {
      // check if there's a chat with the given id
      Chat chat = chatRepository
        .findChatById(Long.parseLong(chatID))
        .orElseThrow(
          () -> new ChatNotFoundException("No chat associated with id: " + chatID));
      
      // extract the logged-in user from the token
      String token = jwtService.getTokenFromCookie(request);
      String username = jwtService.extractUsername(token);
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException(
          "No user associated with this email address: " + username));
      
      // create the message object
      Message newMessage = new Message();
      newMessage.setContent(message.content());
      newMessage.setUser(user);
      newMessage.setChat(chat);
      
      Message response = messageRepository.save(newMessage);
      
      return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(MessageSuccessResponse
          .builder()
          .id(response.getId())
          .content(response.getContent())
          .createdAt(response.getCreatedAt())
          .chat_id(response.getChat().getId())
          .senderID(response.getUser().getId())
          .build());
      
    }
    catch (Exception e) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(MessageErrorResponse.builder().error(e.getMessage()).build());
    }
  }
}
