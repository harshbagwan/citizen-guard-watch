package com.portal.controller;

import com.portal.model.User;
import com.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userService.findByUsername(username).orElse(null);
            if (user != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Login successful");
                response.put("user", Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "roles", user.getRoles()
                ));
                return ResponseEntity.ok(response);
            }

            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User not found"));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> userData) {
        try {
            String username = (String) userData.get("username");
            String password = (String) userData.get("password");
            String name = (String) userData.get("name");
            String email = (String) userData.get("email");
            Set<String> roles = Set.of((String) userData.get("role"));

            if (userService.existsByUsername(username)) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Username already exists"));
            }

            if (userService.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email already exists"));
            }

            User user = userService.createUser(username, password, name, email, roles);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "name", user.getName(),
                "email", user.getEmail(),
                "roles", user.getRoles()
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Registration failed"));
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            User user = userService.findByUsername(authentication.getName()).orElse(null);
            if (user != null) {
                return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "roles", user.getRoles()
                ));
            }
        }
        return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User not authenticated"));
    }
}