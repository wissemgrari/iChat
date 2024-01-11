package com.wissem.chat;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/chats")
@RequiredArgsConstructor
public class ChatController {

  private final ChatService chatService;


  // @desc    Get a list of all chat rooms for the logged-in user
  // @route   GET /api/v1/chats
  // @access  Private
  @GetMapping
  public ResponseEntity<List<ChatDTO>> getAllChats(HttpServletRequest request) {
    return chatService.getAllChats(request);
  }

  // @desc    Create a new chat room
  // @route   POST /api/v1/chats/create
  // @access  Private
  @PostMapping("/create")
  public ChatResponse create(HttpServletRequest request, @RequestBody Map<String, String> requestBody) {
    return chatService.create(request, requestBody).getBody();
  }

  // @desc    Delete an existing chat room
  // @route   DELETE /api/v1/chats/:id
  // @access  Private
  @DeleteMapping("/{chatId}")
  public ResponseEntity<?> remove(@PathVariable String chatId) {
    return chatService.remove(chatId);
  }

  @MessageMapping("/hello")
  @SendTo("/topic/greetings")
  public Greeting greeting(HelloMessage message) throws Exception {
    Thread.sleep(1000); // simulated delay
    return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
  }

}