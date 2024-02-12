package com.wissem.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.wissem.config.JwtService;
import com.wissem.user.User;
import com.wissem.user.UserInfo;
import com.wissem.user.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
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
  
  private final OpaqueTokenIntrospector tokenIntrospector;
  private final JwtService jwtService;
  private final UserRepository userRepository;
  
  @Value("${jwt.cookieExpiry}") private int cookieExpiry;
  
  @Value("${spring.security.oauth2.resourceserver.opaquetoken.client-id}") private String
    clientId;
  
  @Value("${spring.security.oauth2.resourceserver.opaquetoken.client-secret}")
  private String clientSecret;
  
  @GetMapping("/google_url")
  public ResponseEntity<UrlDTO> auth() {
    String url =
      new GoogleAuthorizationCodeRequestUrl(clientId, "http://localhost:4200/login",
        Arrays.asList("email", "profile", "openid")).build();
    
    return ResponseEntity.ok(new UrlDTO(url));
  }
  
  
  @GetMapping("/callback")
  public ResponseEntity<UserInfo> callback(@RequestParam("code") String code,
                                           HttpServletResponse response) {
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
    
    // Introspect the token to get user info
    OAuth2AuthenticatedPrincipal principal = tokenIntrospector.introspect(token);
    if (principal == null) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    
    // Extract user info from the principal
    UserInfo userInfo = new UserInfo();
    userInfo.setId(principal.getAttribute("sub"));
    userInfo.setEmail(principal.getAttribute("email"));
    userInfo.setName(principal.getAttribute("name"));
    userInfo.setPicture(principal.getAttribute("picture"));
    
    // check if there's a registred user with the same email
    User user = userRepository.findByEmail(userInfo.getEmail()).orElse(null);
    if (user != null) {
      userInfo.setId(user.getId());
    }
    
    var accessToken = jwtService.generateToken(userInfo);
    
    // set accessToken to cookie header
    ResponseCookie cookie = ResponseCookie
      .from("accessToken", accessToken)
      .httpOnly(true)
      .secure(false)
      .path("/")
      .maxAge(cookieExpiry)
      .build();
    
    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    return ResponseEntity.ok(userInfo);
  }
}

record UrlDTO(String url) {
}