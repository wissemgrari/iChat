package com.wissem.user;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    
    // @desc    Get a list of all chat rooms for the logged-in user
    // @route   GET /api/v1/chats
    // @access  Private
    @GetMapping
    public UserResponse getAllUsers(HttpServletRequest request) {
        return userService.getAllUsers(request).getBody();
    }

}
