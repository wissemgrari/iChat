package com.wissem.chat;

import com.wissem.config.JwtService;
import com.wissem.exception.UserNotFoundException;
import com.wissem.user.User;
import com.wissem.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    // Create Chat
    public ResponseEntity<ChatResponse> create(HttpServletRequest request, String participantId) {
        try {
            // check if there's a participant with the given id
            User participant = userRepository
              .findById(Integer.parseInt(participantId))
              .orElseThrow(() -> new UserNotFoundException("There's no user with such id: " + participantId));
            // extract the logged-in user id from the token
            String token = jwtService.getTokenFromHeader(request);
            String username = jwtService.extractUsername(token);
            User user = userRepository.findByEmail(username).orElseThrow();

            if(chatRepository.existsByParticipants(List.of(user.getId(), Integer.parseInt(participantId)))) {
                return ResponseEntity
                  .status(HttpStatus.BAD_REQUEST)
                  .body(ChatResponse
                    .builder()
                    .error("The chat is already exist")
                    .build());
            }

            var chat = Chat.builder()
              .participants(List.of(user.getId(), Integer.parseInt(participantId)))
              .build();

            chatRepository.save(chat);

            return ResponseEntity
              .status(HttpStatus.CREATED)
              .body(ChatResponse
                .builder()
                .chat_id(chat.getId())
                .participants(chat.getParticipants())
                .build());
        } catch (Exception e) {
            return ResponseEntity
              .status(HttpStatus.BAD_REQUEST)
              .body(ChatResponse
                .builder()
                .error("something went wrong: " + e.getMessage())
                .build());
        }
    }
}
