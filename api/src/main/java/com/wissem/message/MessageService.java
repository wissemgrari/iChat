package com.wissem.message;

import com.wissem.chat.Chat;
import com.wissem.chat.ChatRepository;
import com.wissem.config.JwtService;
import com.wissem.exception.ChatNotFoundException;
import com.wissem.user.User;
import com.wissem.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

  private final MessageRepository messageRepository;
  private final ChatRepository chatRepository;
  private final JwtService jwtService;
  private final UserRepository userRepository;

  public ResponseEntity<MessageResponse> sendMessage(HttpServletRequest request, String chatId, Message message) {
    try {

      // extract the logged-in user from the token
      String token = jwtService.getTokenFromHeader(request);
      String username = jwtService.extractUsername(token);
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UsernameNotFoundException("No user associated with this email address: " + username));

      // check if there's a chat with the given id
      Chat chat = chatRepository
        .findChatById(Long.parseLong(chatId))
        .orElseThrow(() -> new ChatNotFoundException("No chat associated with id: " + chatId));

      // create the message object
      Message newMessage = new Message();
      newMessage.setContent(message.getContent());
      newMessage.setUser(user);
      newMessage.setChat(chat);

      Message response = messageRepository.save(newMessage);

      return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(MessageResponse.builder().message_id(response.getId()).chat_id(response.getChat().getId()).build());

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MessageResponse.builder().error(e.getMessage()).build());
    }
  }
}
