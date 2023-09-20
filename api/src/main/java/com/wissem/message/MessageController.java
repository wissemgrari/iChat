package com.wissem.message;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {

  private final MessageService messageService;

  @PostMapping("/{chatId}")
  public ResponseEntity<MessageResponse> sendMessage(HttpServletRequest request, @PathVariable String chatId, @RequestBody Message message) {
    return messageService.sendMessage(request, chatId, message);
  }
}
