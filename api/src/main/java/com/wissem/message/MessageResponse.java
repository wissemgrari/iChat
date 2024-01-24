package com.wissem.message;

import com.wissem.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;


public interface MessageResponse {
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
class MessageSuccessResponse implements MessageResponse {
  private Long id;
  private String content;
  private LocalDateTime createdAt;
  private Long senderID;
  private MessageStatus status;
  private Long chat_id;
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
class MessageErrorResponse implements MessageResponse {
  private String error;
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
class MessageListResponse implements MessageResponse {
  private UserDTO user;
  private UserDTO participant;
  private List<MessageResponse> messages;
}

class MessageResponseMapper
  implements MessageResponse, Function<Message, MessageResponse> {
  @Override
  public MessageSuccessResponse apply(Message message) {
    return MessageSuccessResponse
      .builder()
      .id(message.getId())
      .content(message.getContent())
      .status(message.getStatus())
      .createdAt(message.getCreatedAt())
      .senderID(message.getUser().getId())
      .chat_id(message.getChat().getId())
      .build();
  }
}