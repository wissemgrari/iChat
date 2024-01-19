package com.wissem.chat;

import com.wissem.config.JwtService;
import com.wissem.exception.ChatNotFoundException;
import com.wissem.exception.UserNotFoundException;
import com.wissem.user.User;
import com.wissem.user.UserRepository;
import com.wissem.user_chat.UserChat;
import com.wissem.user_chat.UserChatId;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {

  private final ChatRepository chatRepository;
  private final JwtService jwtService;
  private final UserRepository userRepository;
  private final ChatDTOMapper chatDTOMapper;

  public ResponseEntity<List<ChatDTO>> getAllChats(HttpServletRequest request) {
    try {
      // extract the logged-in user from the token
      String token = jwtService.getTokenFromCookie(request);
      String username = jwtService.extractUsername(token);
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UserNotFoundException("No user associated with this email address: " + username));
      // check if the user have chats
      // IF YES: return them
      // IF NO: return null
      List<ChatDTO> chats = chatRepository.findChatsByUser(user.getId());
      
      /*
      * TODO:
      *  - For each chat return the user and the participant
      *  - HINT: user userChats array
      *  - Change the response type to match the correspond returned data
      */
      
      
      return ResponseEntity.status(HttpStatus.OK).body(chats);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }
  }

  public ResponseEntity<ChatDTO> create(HttpServletRequest request, Map<String, String> requestBody) {
    try {
      String userId = requestBody.get("userId");
      // check if there's a participant with the given id
      User participant = userRepository
        .findById(Long.parseLong(userId))
        .orElseThrow(() -> new UserNotFoundException("There's no user with such id: " + userId));

      // extract the logged-in user from the token
      String token = jwtService.getTokenFromCookie(request);
      String username = jwtService.extractUsername(token);
      
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("No user associated with this email address: " + username));

      // check if there's an existing chat with the user
      if (chatRepository.existsChatByUsers(user.getId(), participant.getId())) {
        return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(null);  // The chat is already exist
      }

      // prevent the user to create a chat with him-self
      if (user.getId().equals(Long.parseLong(userId))) {
        return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(null);  // Unable to create a chat with yourself
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
        .body(ChatDTO.builder()
          .id(newChat.getId())
          .created_at(newChat.getCreated_at())
          .build());
    } catch (Exception e) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }
  }

  public ResponseEntity<?> remove(String chatId) {
    try {

      Long id = Long.parseLong(chatId);
      Chat chat = chatRepository
        .findChatById(id)
        .orElseThrow(() -> new ChatNotFoundException("Unable to find the chat with the given id"));

      chatRepository.delete(chat);
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(Map.of("chat_id", id, "message", "chat " + id + " is removed"));
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }
  }

}
