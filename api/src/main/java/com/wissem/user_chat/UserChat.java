package com.wissem.user_chat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wissem.chat.Chat;
import com.wissem.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "UserChat")
@Table(name = "user_chat")
@NoArgsConstructor
@Getter
@Setter
public class UserChat {

  @EmbeddedId
  private UserChatId id;

  @ManyToOne
  @MapsId("chatId")
  @JoinColumn(
    name = "chat_id",
    nullable = false,
    referencedColumnName = "id",
    foreignKey = @ForeignKey(name = "chat_id_fk")
  )
  @JsonIgnore
  @JsonBackReference
  private Chat chat;

  @ManyToOne
  @MapsId("userId")
  @JoinColumn(
    name = "user_id",
    nullable = false,
    referencedColumnName = "id",
    foreignKey = @ForeignKey(name = "user_id_fk")
  )
  @JsonIgnore
  @JsonBackReference
  private User user;

  @Column(
    name = "participant_id",
    nullable = false,
    columnDefinition = "BIGINT"
  )
  private Long participant;

}
