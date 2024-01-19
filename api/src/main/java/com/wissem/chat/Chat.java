package com.wissem.chat;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.wissem.message.Message;
import com.wissem.user_chat.UserChat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chats")
@NoArgsConstructor
@Getter
@Setter
public class Chat{

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
  private LocalDateTime created_at = LocalDateTime.now();

  @OneToMany(
    cascade = CascadeType.ALL,
    orphanRemoval = true,
    mappedBy = "chat",
    fetch = FetchType.LAZY
  )
  @JsonManagedReference // This is used for bidirectional serialization
  @JsonIgnoreProperties("chat") // This will ignore the field in serialization
  private List<Message> messages = new ArrayList<>();

  @OneToMany(
    mappedBy = "chat",
    cascade = CascadeType.ALL,
    fetch = FetchType.LAZY
  )
  @JsonManagedReference // This is used for bidirectional serialization
  @JsonIgnoreProperties("chat") // This will ignore the field in serialization
  private List<UserChat> userChats = new ArrayList<>();

}
