package com.wissem.user;

public record UserDTO(
  Long id,
  String firstName,
  String lastName,
  String email
) { }