package com.wissem.chat;

import com.wissem.user_chat.UserChat;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ChatDTOMapper implements Function<Chat, ChatDTO> {
  @Override
  public ChatDTO apply(Chat chat) {
    return new ChatDTO(
      chat.getId(),
      chat.getCreatedAt(),
      chat.getUserChats().stream().map(UserChat::getParticipant).mapToLong(Long::longValue).sum()
    );
  }
}
