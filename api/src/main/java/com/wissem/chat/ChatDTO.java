package com.wissem.chat;

import java.time.LocalDateTime;

public record ChatDTO(
  Long id,
  LocalDateTime createdAt,
  Long participantId
) {
}
