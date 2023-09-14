package com.wissem.chat;

import com.wissem.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
  @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END " +
    "FROM Chat c " +
    "JOIN c.userChats uc " +
    "WHERE (uc.user = :user AND uc.participant = :participant) OR (uc.user = :participant AND uc.participant = :user)")
  boolean existsChatByUsers(User user, User participant);

  @Query("SELECT DISTINCT c FROM Chat c " +
    "INNER JOIN c.userChats uc " +
    "WHERE :user IN (uc.user, uc.participant)")
  List<Chat> findChatsByUser(User user);

}
