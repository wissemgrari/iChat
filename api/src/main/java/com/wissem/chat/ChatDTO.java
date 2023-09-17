package com.wissem.chat;

import java.time.LocalDateTime;
import java.util.Map;

public record ChatDTO(
  Long id,
  LocalDateTime createdAt,
  Map<String, Long> users
) {
}
