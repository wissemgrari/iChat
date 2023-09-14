package com.wissem.chat;

import com.wissem.message.Message;
import com.wissem.user.User;
import com.wissem.user_chat.UserChat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "chats")
@NoArgsConstructor
@Getter
@Setter
public class Chat {

  @Id
  @SequenceGenerator(
    name = "chat_sequence",
    sequenceName = "chat_sequence",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "chat_sequence"
  )
  @Column(
    name = "id",
    updatable = false
  )
  private Long id;

  @Column(
    name = "created_at",
    nullable = false,
    columnDefinition = "TIMESTAMP WITHOUT TIME ZONE"
  )
  private LocalDateTime createdAt = LocalDateTime.now();

  @OneToMany(
    cascade = CascadeType.ALL,
    orphanRemoval = true,
    mappedBy = "chat"
  )
  private List<Message> messages = new ArrayList<>();

  @OneToMany(
    mappedBy = "chat",
    cascade = CascadeType.ALL
  )
  private List<UserChat> userChats = new ArrayList<>();

}
