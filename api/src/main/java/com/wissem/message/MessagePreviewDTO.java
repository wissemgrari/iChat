package com.wissem.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class MessagePreviewDTO {
  private Long id;
  private String content;
  private LocalDateTime createdAt;
  private MessageStatus status;
  private Long senderID;
}
