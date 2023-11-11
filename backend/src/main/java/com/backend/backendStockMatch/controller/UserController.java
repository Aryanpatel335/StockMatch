package com.backend.backendStockMatch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;
import com.backend.backendStockMatch.model.User;
import com.backend.backendStockMatch.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Add more endpoints as needed for update, delete, etc.
}
