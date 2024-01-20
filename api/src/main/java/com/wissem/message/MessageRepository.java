package com.wissem.message;

import com.wissem.chat.Chat;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MessageRepository extends CrudRepository<Message, Long> {
  
  @Query(value = "SELECT * FROM messages msg " +
    "WHERE msg.chat_id = :id " +
    "ORDER BY msg.created_at DESC " +
    "LIMIT 1", nativeQuery = true)
  Optional<Message> findLatestMessageByChatId(@Param("id") Long id);
  
}
