package com.wissem.auth;

import com.wissem.config.JwtService;
import com.wissem.user.User;
import com.wissem.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    try {
      if (userRepository.existsByEmail(request.getEmail())) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(AuthenticationResponse.builder()
                .error("Email already in use")
                .build());
      }

      var user = User.builder()
          .firstName(request.getFirstname())
          .lastName(request.getLastname())
          .email(request.getEmail())
          .password(passwordEncoder.encode(request.getPassword()))
          .build();
      userRepository.save(user);

      var token = jwtService.generateToken(user);
      return ResponseEntity
          .status(HttpStatus.CREATED)
          .body(AuthenticationResponse.builder()
              .token(token)
              .build());
    } catch (Exception e) {
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(AuthenticationResponse.builder()
              .error("An error occurred during registration")
              .build());
    }
  }


  public ResponseEntity<AuthenticationResponse> login(LoginRequest request) {
   try {

     authManager.authenticate(
         new UsernamePasswordAuthenticationToken(
             request.getEmail(),
             request.getPassword()
         )
     );
     var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
     var token = jwtService.generateToken(user);

     return ResponseEntity
         .status(HttpStatus.OK)
         .body(AuthenticationResponse.builder()
             .token(token)
             .build());
   } catch(BadCredentialsException e) {
     return ResponseEntity
         .status(HttpStatus.OK)
         .body(AuthenticationResponse.builder()
             .error("Invalid email or password")
             .build()
         );
   }
  }

}

