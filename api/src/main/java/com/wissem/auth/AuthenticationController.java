package com.wissem.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService authService;

  @PostMapping("/register")
  public AuthenticationResponse register(@RequestBody RegisterRequest request) {
    return authService.register(request).getBody();
  }

  @PostMapping("/login")
  public AuthenticationResponse login(@RequestBody LoginRequest request) {
    return authService.login(request).getBody();
  }

}
