package com.wissem.message;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {
  
  private final MessageService messageService;
  
  // @desc    Get all messages in a chat
  // @route   GET /api/v1/messages/:chatID
  // @access  Private
  @GetMapping("/api/v1/messages/{chatID}")
  public MessageResponse getMessages(HttpServletRequest request, @PathVariable String chatID) {
    return messageService.getMessages(request, chatID).getBody();
  }
  
  // @desc    Send a message
  // @route   WEBSOCKET /app/chatID/send
  // @access  Private
  @MessageMapping("/{chatID}/send")
  public MessageResponse sendMessage(HttpServletRequest request,
                                     @PathVariable String chatID,
                                     @Payload MessageRequest message) {
    return messageService.sendMessage(request, chatID, message).getBody();
  }
}
