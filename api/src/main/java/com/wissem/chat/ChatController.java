package com.wissem.chat;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chats")
@RequiredArgsConstructor
public class ChatController {

  private final ChatService chatService;


  // @desc    Get a list of all chat rooms for the logged-in user
  // @route   GET /api/v1/chats
  // @access  Private
  @GetMapping
  public ChatResponse getAllChats(HttpServletRequest request) {
    return chatService.getAllChats(request).getBody();
  }

  // @desc    Create a new chat room
  // @route   POST /api/v1/chats/create
  // @access  Private
  @PostMapping("/create")
  public ChatResponse create(HttpServletRequest request, @RequestBody CreateChatRequest requestBody) {
    return chatService.create(request, requestBody).getBody();
  }

  // @desc    Delete an existing chat room
  // @route   DELETE /api/v1/chats/:id
  // @access  Private
  @DeleteMapping("/{chatId}")
  public ChatResponse remove(@PathVariable String chatId) {
    return chatService.remove(chatId).getBody();
  }

}