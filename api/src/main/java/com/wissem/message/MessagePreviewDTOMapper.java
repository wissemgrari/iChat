package com.wissem.message;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class MessagePreviewDTOMapper implements Function<Message, MessagePreviewDTO> {
  @Override
  public MessagePreviewDTO apply(Message message) {
    return new MessagePreviewDTO(
      message.getId(),
      message.getContent(),
      message.getCreatedAt(),
      message.getStatus(),
      message.getUser().getId()
    );
  }
}
