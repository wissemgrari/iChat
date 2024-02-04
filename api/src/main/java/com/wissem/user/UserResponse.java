package com.wissem.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public interface UserResponse {
}


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
class UserListResponse implements UserResponse {
  private List<UserDTO> users;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
class UserErrorResponse implements UserResponse {
  private String error;
}
