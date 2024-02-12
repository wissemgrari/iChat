package com.wissem.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserInfoDTO {
  private String sub;
  private String name;
  private String given_name;
  private String family_name;
  private String picture;
  private String email;
  private boolean email_verified;
  private String locale;
  
}
