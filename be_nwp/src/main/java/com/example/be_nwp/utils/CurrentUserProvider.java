package com.example.be_nwp.utils;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserProvider {

    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;

    public CurrentUserProvider(JwtUtil jwtUtil, HttpServletRequest request) {
        this.jwtUtil = jwtUtil;
        this.request = request;
    }

    public Long getUserId() {
        return getClaims().get("userId", Long.class);
    }

    public String getRole() {
        return getClaims().get("role", String.class);
    }

    private Claims getClaims() {
        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        return jwtUtil.parseToken(header.substring(7));
    }
}
