package com.wissem.chat;

import com.wissem.message.MessagePreviewDTO;
import com.wissem.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;


public interface ChatResponse {
}

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
class ChatSuccessResponse implements ChatResponse {
  private Long id;
  private LocalDateTime createdAt;
  private UserDTO user1;
  private UserDTO user2;
  private MessagePreviewDTO msgPreview;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
class ChatErrorResponse implements ChatResponse {
  private String error;
}


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
class ChatExistResponse implements ChatResponse {
  private String message;
  private ChatDTO chat;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
class ChatListResponse implements ChatResponse {
  private List<ChatResponse> chats;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
class ChatDeletedResponse implements ChatResponse {
  private Long id;
  private String message;
}
