package com.wissem.message;

public record MessageRequest(
  String content,
  Long senderID,
  Long recipientID
) {
}
