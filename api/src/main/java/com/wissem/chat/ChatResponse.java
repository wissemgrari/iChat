package com.wissem.chat;

import com.wissem.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
  private Long chat_id;
  private List<UserDTO> users;
  private String error;
}
