package com.example.be_nwp.controllers;

import com.example.be_nwp.dtos.LoginRequest;
import com.example.be_nwp.dtos.TokenResponse;
import com.example.be_nwp.services.AuthService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE)
    public TokenResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
