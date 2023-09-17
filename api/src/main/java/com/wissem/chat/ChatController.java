package com.wissem.chat;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

  private final ChatService chatService;

  @PostMapping("/{userId}")
  public ChatResponse create(HttpServletRequest request, @PathVariable String userId) {
    return chatService.create(request, userId).getBody();
  }

  @GetMapping
  public ResponseEntity<List<ChatDTO>> getAllChats(HttpServletRequest request) {
    return chatService.getAllChats(request);
  }
}
