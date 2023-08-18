package com.wissem.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {
  @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Chat c WHERE c.participants = :participants")
  boolean existsByParticipants(List<Integer> participants);

  @Query(
    nativeQuery = true,
    value = "SELECT c.* FROM chats c JOIN users u ON u.id = ANY(c.participants) WHERE u.id = :userId"
  )
  List<Chat> findByUserIdInChat(Integer userId);


}
