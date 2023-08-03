package com.wissem.chatapi.chat;
import jakarta.persistence.*;

@Entity
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
