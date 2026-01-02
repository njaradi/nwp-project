package com.example.be_nwp.aspects;

import com.example.be_nwp.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import com.example.be_nwp.annotations.Authorized;

import java.util.Arrays;

@Aspect
@Component
public class AuthorizationAspect {

    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;

    public AuthorizationAspect(JwtUtil jwtUtil, HttpServletRequest request) {
        this.jwtUtil = jwtUtil;
        this.request = request;
    }

    @Around("@annotation(authorized)")
    public Object authorize(ProceedingJoinPoint joinPoint, Authorized authorized) throws Throwable {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        String token = header.substring(7);

        Claims claims;
        try {
            claims = jwtUtil.parseToken(token);
            String userRole = claims.get("role", String.class);

            String[] allowedRoles = authorized.roles();

            boolean allowed = Arrays.stream(allowedRoles)
                    .anyMatch(r -> r.equals(userRole));

            if (!allowed) {
                throw new RuntimeException("Forbidden");
            }

        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }

        return joinPoint.proceed();
    }
}