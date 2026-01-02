package com.example.be_nwp.services;

import com.example.be_nwp.dtos.LoginRequest;
import com.example.be_nwp.dtos.TokenResponse;
import com.example.be_nwp.model.User;
import com.example.be_nwp.repositories.UserRepository;
import com.example.be_nwp.utils.JwtUtil;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public TokenResponse login(LoginRequest request) {

        User user = userRepository
                .findByUsername(request.username());
        if(user == null) {
            throw new RuntimeException("User not found");
        }
        if (!user.getPassword().equals(request.passwordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user);

        return new TokenResponse(token);
    }
}
