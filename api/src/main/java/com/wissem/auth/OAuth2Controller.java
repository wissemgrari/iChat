package com.wissem.auth;


import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Arrays;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/oauth2")
public class OAuth2Controller {
  
  @Value("${spring.security.oauth2.resourceserver.opaquetoken.client-id}") private String
    clientId;
  
  @Value("${spring.security.oauth2.resourceserver.opaquetoken.client-secret}")
  private String clientSecret;
  
  
  @GetMapping("/google_url")
  public ResponseEntity<UrlDTO> auth() {
    String url = new GoogleAuthorizationCodeRequestUrl(clientId,
      "http://localhost:4200/login",
      Arrays.asList(
        "email",
        "profile",
        "openid")).build();
    
    return ResponseEntity.ok(new UrlDTO(url));
  }
  
  
  @GetMapping("/callback")
  public ResponseEntity<TokenDTO> callback(@RequestParam("code") String code) {
    String token;
    try {
      token =
        new GoogleAuthorizationCodeTokenRequest(new NetHttpTransport(), new GsonFactory(),
          clientId, clientSecret, code, "http://localhost:4200/login")
          .execute()
          .getAccessToken();
    }
    catch (IOException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    return ResponseEntity.ok(new TokenDTO(token));
  }
  
}

record UrlDTO(String url) {
}

record TokenDTO(String token) {
}