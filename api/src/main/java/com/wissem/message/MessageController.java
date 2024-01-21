package com.wissem.message;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {
  
  private final MessageService messageService;
  
  // @desc    Get all messages in a chat
  // @route   GET /api/v1/messages/:chatID
  // @access  Private
  @GetMapping("/{chatID}")
  public MessageResponse getMessages(HttpServletRequest request, @PathVariable String chatID) {
    return messageService.getMessages(request, chatID).getBody();
  }
  
  // @desc    Send a message
  // @route   POST /api/v1/messages/send/:chatID
  // @access  Private
  @PostMapping("/send/{chatID}")
  public MessageResponse sendMessage(HttpServletRequest request,
                                     @PathVariable String chatID,
                                     @RequestBody MessageRequest message) {
    return messageService.sendMessage(request, chatID, message).getBody();
  }
}
