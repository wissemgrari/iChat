package com.wissem.message;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.wissem.chat.Chat;
import com.wissem.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@NoArgsConstructor
@Getter
@Setter
public class Message {

  @Id
  @SequenceGenerator(
    name = "message_sequence",
    sequenceName = "message_sequence",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "message_sequence"
  )
  @Column(
    name = "id",
    updatable = false
  )
  private Long id;

  @Column(
    name = "content",
    nullable = false,
    columnDefinition = "TEXT"
  )
  private String content;

  @Column(
    name = "created_at",
    nullable = false,
    columnDefinition = "TIMESTAMP WITHOUT TIME ZONE"
  )
  private LocalDateTime createdAt = LocalDateTime.now();

  @Enumerated(EnumType.STRING)
  @Column(
    name = "status",
    nullable = false
  )
  private MessageStatus status = MessageStatus.DELIVERED;

  @ManyToOne
  @JoinColumn(
    name = "user_id",
    nullable = false,
    referencedColumnName = "id",
    foreignKey = @ForeignKey(name = "user_message_fk")
  )
  @JsonBackReference
  private User user;

  @ManyToOne
  @JoinColumn(
    name = "chat_id",
    nullable = false,
    referencedColumnName = "id",
    foreignKey = @ForeignKey(name = "chat_message_fk")
  )
  @JsonBackReference
  private Chat chat;

  public Message(String content) {
    this.content = content;
  }
  
  
  public Message(Long id, String content, LocalDateTime createdAt, MessageStatus status,
                 User user, Chat chat) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.status = status;
    this.user = user;
    this.chat = chat;
  }
}
