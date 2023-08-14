package com.wissem.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public void createUser() {
        User user = new User("wissem", "grari", "grariwissem@gmail.com");
        userRepository.save(user);
    }
}