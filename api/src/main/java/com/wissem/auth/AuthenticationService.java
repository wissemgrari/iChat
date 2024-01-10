package com.wissem.auth;

import com.wissem.config.JwtService;
import com.wissem.user.User;
import com.wissem.user.UserDTOMapper;
import com.wissem.user.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final AuthenticationManager authManager;

  public ResponseEntity<AuthenticationResponse> register(RegisterRequest request) {

    // validation
    if(request.getFirstname() == null || request.getLastname() == null || request.getEmail() == null || request.getPassword() == null) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(AuthenticationResponse.builder()
          .error("All fields are required")
          .build());
    }

    try {
      if (userRepository.existsByEmail(request.getEmail())) {
        return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(AuthenticationResponse.builder()
            .error("Email already in use")
            .build());
      }

      User user = new User(
        request.getFirstname(),
        request.getLastname(),
        request.getEmail(),
        passwordEncoder.encode(request.getPassword())
      );

      User userResponse = userRepository.save(user);

      return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(AuthenticationResponse.builder()
          .message("Registration process succeeded")
          .user(new UserDTOMapper().apply(userResponse))
          .build());
    } catch (Exception e) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(AuthenticationResponse.builder()
          .error("An error occurred during registration")
          .build());
    }
  }


  public ResponseEntity<AuthenticationResponse> login(LoginRequest request, HttpServletResponse response) {

    // validation
    if(request.getEmail() == null || request.getPassword() == null) {
      return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(AuthenticationResponse.builder()
          .error("All fields are required")
          .build());
    }

    try {
      authManager.authenticate(
        new UsernamePasswordAuthenticationToken(
          request.getEmail(),
          request.getPassword()
        )
      );
      var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
      var accessToken = jwtService.generateToken(user);

      // set accessToken to cookie header
      ResponseCookie cookie = ResponseCookie.from("accessToken", accessToken)
        .httpOnly(true)
        .secure(false)
        .path("/")
        .maxAge(24 * 60 * 60) // equivalent to 1 day
        .build();

      response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

      return ResponseEntity
        .status(HttpStatus.OK)
        .body(AuthenticationResponse.builder()
          .message("Login process succeeded")
          .user(new UserDTOMapper().apply(user))
          .build());

    } catch (BadCredentialsException e) {
      return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(AuthenticationResponse.builder()
          .error("Invalid email or password")
          .build()
        );
    }
  }

}

