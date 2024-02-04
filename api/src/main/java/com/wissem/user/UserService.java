package com.wissem.user;

import com.wissem.config.JwtService;
import com.wissem.exception.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final JwtService jwtService;
  
  public ResponseEntity<UserResponse> getAllUsers(HttpServletRequest request) {
    
    try {
      
      // extract the logged-in user from the token
      String token = jwtService.getTokenFromCookie(request);
      String username = jwtService.extractUsername(token);
      User user = userRepository
        .findByEmail(username)
        .orElseThrow(() -> new UserNotFoundException(
          "No user " + "associated with this email address: " + username));
      
      Iterable<User> response = userRepository.findAll();
      
      if (!response.iterator().hasNext()) {
        return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(UserErrorResponse
            .builder()
            .error("There are no users at the moment")
            .build());
      }
      
      // initialize the array that will hold the users
      List<UserDTO> users = new ArrayList<>();
      
      response.forEach(u -> {
        if (!u.getId().equals(user.getId())) {
          users.add(new UserDTOMapper().apply(u));
        }
      });
      
      return ResponseEntity
        .status(HttpStatus.OK)
        .body(UserListResponse.builder().users(users).build());
      
    }
    catch (Exception e) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(UserErrorResponse.builder().error(e.getMessage()).build());
    }
  }
}