package com.wissem.chat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "chats")
public class Chat {
    @Id
    @GeneratedValue
    private int id;
    private int[] participants;

    public Chat() {}
    public Chat(int[] participants) {
        this.participants = participants;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int[] getParticipants() {
        return participants;
    }
    public void setParticipants(int[] participants) {
        this.participants = participants;
    }
}
