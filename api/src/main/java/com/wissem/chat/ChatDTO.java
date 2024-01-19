package com.wissem.chat;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {
  private Long id;
  private LocalDateTime created_at;
}
