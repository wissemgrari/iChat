package com.wissem.chat;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "chats")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Chat {
  @Id
  @GeneratedValue
  private Integer id;

  private List<Integer> participants;
}
