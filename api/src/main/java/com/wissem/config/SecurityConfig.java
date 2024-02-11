package com.wissem.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
  
  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  private final WebClient userInfoClient;
  
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
      .csrf(AbstractHttpConfigurer::disable)
      .cors(withDefaults())
      .exceptionHandling(customizer -> customizer.authenticationEntryPoint(
        new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/v1/auth/**", "/api/v1/oauth2/**", "/ws/**")
        .permitAll()
        .anyRequest()
        .authenticated())
      .oauth2ResourceServer(c -> c.opaqueToken(withDefaults()))
      .sessionManagement(
        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .logout(logout -> logout
        .logoutUrl("/api/v1/auth/logout")
        .deleteCookies("accessToken")
        .logoutSuccessHandler(
          (request, response, authentication) -> SecurityContextHolder.clearContext()))
      .authenticationProvider(authenticationProvider)
      .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
      .build();
  }
  
  @Bean
  public OpaqueTokenIntrospector introspector() {
    return new GoogleOpaqueTokenIntrospector(userInfoClient);
  }
  
}
