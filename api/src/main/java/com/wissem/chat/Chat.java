package com.wissem.chat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
