package com.wissem.chat;

import com.wissem.config.JwtService;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

  private final ChatRepository chatRepository;
  private final JwtService jwtService;
  private final UserRepository userRepository;

  // Create Chat
  public ResponseEntity<ChatResponse> create(HttpServletRequest request, String userId) {
    try {

      // check if there's a participant with the given id
      User participant = userRepository
        .findById(Integer.parseInt(userId))
        .orElseThrow(() -> new UserNotFoundException("There's no user with such id: " + userId));

      // extract the logged-in user from the token
      String token = jwtService.getTokenFromHeader(request);
      String username = jwtService.extractUsername(token);
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("No user associated with this email address: " + username));

      // check if there's an existing chat with the user
      if (chatRepository.existsChatByUsers(user.getId(), participant.getId())) {
        return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(ChatResponse.builder().error("The chat is already exist").build());
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
        .body(ChatResponse.builder().chat_id(newChat.getId()).users(List.of(user, participant)).build());
    } catch (Exception e) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(ChatResponse.builder().error("something went wrong: " + e.getMessage()).build());
    }
  }

  // Get all chats for the logged-in user
  public ResponseEntity<List<Chat>> getAllChats(HttpServletRequest request) {
    try {
      // extract the logged-in user from the token
      String token = jwtService.getTokenFromHeader(request);
      String username = jwtService.extractUsername(token);
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UserNotFoundException("No user associated with this email address: " + username));
      // check if the user have chats
      // IF YES: return them
      // IF NO: return null
      List<Chat> chats = chatRepository.findChatsByUser(user);
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(chats);
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(null);
    }
  }
}
