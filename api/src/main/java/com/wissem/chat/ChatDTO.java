package com.wissem.chat;

import com.wissem.user.User;
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
  private Long user1;
  private Long user2;
}
