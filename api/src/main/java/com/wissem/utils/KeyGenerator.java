package com.wissem.utils;

import java.security.SecureRandom;
import java.util.Base64;

public class KeyGenerator {
  public static void main(String[] args) {
    byte[] keyBytes = generateRandomKey();
    String keyBase64 = encodeBase64(keyBytes);

    System.out.println("Generated key (Base64): " + keyBase64);
  }

  private static byte[] generateRandomKey() {
    SecureRandom secureRandom = new SecureRandom();
    byte[] key = new byte[32]; // 256 bits
    secureRandom.nextBytes(key);
    return key;
  }

  private static String encodeBase64(byte[] data) {
    return Base64.getEncoder().encodeToString(data);
  }
}
