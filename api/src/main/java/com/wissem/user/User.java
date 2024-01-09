package com.wissem.user;

import com.wissem.chat.Chat;
import com.wissem.message.Message;
import com.wissem.user_chat.UserChat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(
  name = "users",
  uniqueConstraints = {
    @UniqueConstraint(name = "user_email_unique", columnNames = "email")
  }
)
public class User implements UserDetails {
  @Id
  @SequenceGenerator(
    name = "user_sequence",
    sequenceName = "user_sequence",
    allocationSize = 1
  )
  @GeneratedValue(
    strategy = GenerationType.SEQUENCE,
    generator = "user_sequence"
  )
  @Column(
    name = "id",
    updatable = false
  )
  private Long id;

  @Column(
    name = "first_name",
    nullable = false,
    columnDefinition = "TEXT"
  )
  private String firstName;

  @Column(
    name = "last_name",
    nullable = false,
    columnDefinition = "TEXT"
  )
  private String lastName;

  @Column(
    name = "email",
    nullable = false,
    columnDefinition = "TEXT"
  )
  private String email;

  @Column(
    name = "password",
    nullable = false,
    columnDefinition = "TEXT"
  )
  private String password;

  @OneToMany(
    cascade = CascadeType.ALL,
    orphanRemoval = true,
    mappedBy = "user",
    fetch = FetchType.EAGER
  )
  private List<Message> messages = new ArrayList<>();

  @OneToMany(
    cascade = CascadeType.ALL,
    mappedBy = "user",
    fetch = FetchType.EAGER
  )
  private List<UserChat> userChats = new ArrayList<>();

  public User(String firstName, String lastName, String email, String password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
