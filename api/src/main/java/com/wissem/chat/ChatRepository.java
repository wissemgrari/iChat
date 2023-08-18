package com.wissem.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
  @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Chat c WHERE c.participants = :participants")
  boolean existsByParticipants(List<Integer> participants);

  @Query(
    nativeQuery = true,
    value = "SELECT * FROM chats c JOIN users u ON u.id IN c.participants;"
  )
  List<Chat> findByUserIdInParticipants(@Param("userId") Integer userId);
}
