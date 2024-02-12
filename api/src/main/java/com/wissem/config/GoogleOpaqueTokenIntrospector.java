package com.wissem.config;

import com.wissem.user.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.OAuth2IntrospectionAuthenticatedPrincipal;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class GoogleOpaqueTokenIntrospector implements OpaqueTokenIntrospector {
  private final WebClient userInfoClient;
  
  @Override
  public OAuth2AuthenticatedPrincipal introspect(String token) {
    UserInfo user = userInfoClient
      .get()
      .uri(uriBuilder -> uriBuilder
        .path("/oauth2/v3/userinfo")
        .queryParam("access_token", token)
        .build())
      .retrieve()
      .bodyToMono(UserInfo.class)
      .block();
    Map<String, Object> attributes = new HashMap<>();
    attributes.put("id", user.getId());
    attributes.put("name", user.getName());
    attributes.put("email", user.getEmail());
    attributes.put("picture", user.getPicture());
    return new OAuth2IntrospectionAuthenticatedPrincipal(user.getName(), attributes, null);
  }
}
