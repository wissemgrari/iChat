package com.wissem.message;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {
  
  private final MessageService messageService;
  
  // @desc    Get all messages in a chat
  // @route   GET /api/v1/messages/:chatID
  // @access  Private
  @GetMapping("/api/v1/messages/{chatID}")
  public MessageResponse getMessages(HttpServletRequest request,
                                     @PathVariable String chatID) {
    return messageService.getMessages(request, chatID).getBody();
  }
  
  // @desc    Send a message
  // @route   WEBSOCKET /app/chatID/send
  // @access  Private
  @MessageMapping("/{chatID}/send")
  public MessageResponse sendMessage(@DestinationVariable String chatID,
                                     @Payload MessageRequest message) {
    System.out.println(message);
    return messageService.sendMessage(chatID, message).getBody();
  }
}
