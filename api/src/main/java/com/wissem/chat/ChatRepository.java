package com.wissem.chat;

import com.wissem.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
  @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END " +
    "FROM Chat c " +
    "JOIN c.userChats uc " +
    "WHERE (uc.user.id = :userId AND uc.participant = :participantId) " +
    "OR (uc.user.id = :participantId AND uc.participant = :userId)")
  boolean existsChatByUsers(Long userId, Long participantId);


  @Query("SELECT c ,uc.user, uc.participant FROM Chat c" +
    " INNER JOIN c.userChats uc" +
    " WHERE uc.user.id = :userID OR uc.participant = :userID")
  List<Chat> findChatsByUser(Long userID);

  Optional<Chat> findChatById(Long id);

}
