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

  // @desc    Create new user account
  // @route   POST /api/v1/auth/register
  // @access  Public
  @PostMapping("/register")
  public AuthenticationResponse register(@RequestBody RegisterRequest request) {
    return authService.register(request).getBody();
  }

  // @desc    Authenticate a user
  // @route   POST /api/v1/auth/login
  // @access  Public
  @PostMapping("/login")
  public AuthenticationResponse login(@RequestBody LoginRequest request) {
    return authService.login(request).getBody();
  }

}
