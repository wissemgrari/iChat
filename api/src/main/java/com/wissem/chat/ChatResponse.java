package com.wissem.chat;

import com.wissem.message.MessagePreview;
import com.wissem.user.UserDTO;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatResponse {
  private Long id;
  private LocalDateTime createdAt;
  private UserDTO user1;
  private UserDTO user2;
  private MessagePreview msgPreview;
}
