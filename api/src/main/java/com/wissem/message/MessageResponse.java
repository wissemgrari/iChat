package com.wissem.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


public interface MessageResponse {
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
class MessageSuccessResponse implements MessageResponse{
  private Long id;
  private String content;
  private LocalDateTime createdAt;
  private Long senderID;
  private Long chat_id;
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
class MessageErrorResponse implements MessageResponse{
  private String error;
}