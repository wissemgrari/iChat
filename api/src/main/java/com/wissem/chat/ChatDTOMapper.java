package com.wissem.chat;

import com.wissem.user_chat.UserChat;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.function.Function;

@Service
public class ChatDTOMapper implements Function<Chat, ChatDTO> {
  @Override
  public ChatDTO apply(Chat chat) {
    return new ChatDTO(
      chat.getId(),
      chat.getCreatedAt(),
      Map.of(
        "user1_id", chat.getUserChats().stream().map(userChat -> userChat.getUser().getId()).mapToLong(Long::longValue).sum(),
        "user2_id", chat.getUserChats().stream().map(UserChat::getParticipant).mapToLong(Long::longValue).sum())
    );
  }
}
