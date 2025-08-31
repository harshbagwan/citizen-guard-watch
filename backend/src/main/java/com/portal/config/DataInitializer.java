package com.portal.config;

import com.portal.model.User;
import com.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        // Create default users if they don't exist
        if (!userService.existsByUsername("citizen1")) {
            userService.createUser(
                "citizen1",
                "demo",
                "John Doe",
                "john@example.com",
                Set.of("CITIZEN")
            );
        }

        if (!userService.existsByUsername("officer1")) {
            userService.createUser(
                "officer1",
                "demo",
                "Officer Smith",
                "smith@cyberpolice.gov",
                Set.of("POLICE")
            );
        }

        System.out.println("Default users created:");
        System.out.println("Citizen - Username: citizen1, Password: demo");
        System.out.println("Police - Username: officer1, Password: demo");
    }
}