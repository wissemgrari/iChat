package com.wissem.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;

    // Create Chat
    public ResponseEntity<ChatResponse> create(ChatRequest request) {
        try {

            if(chatRepository.existsByParticipants(List.of(
              request.getParticipantA(),
              request.getParticipantB()
            ))) {
                return ResponseEntity
                  .status(HttpStatus.BAD_REQUEST)
                  .body(ChatResponse
                    .builder()
                    .error("The chat is already exist")
                    .build());
            }

            var chat = Chat.builder()
              .participants(List.of( request.getParticipantA(), request.getParticipantB()))
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
                .error("something went wrong")
                .build());
        }
    }
}
