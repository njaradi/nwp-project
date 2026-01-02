package com.example.be_nwp.aspects;

import com.example.be_nwp.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuthorizationAspect {

    private final JwtUtil jwtUtil;
    private final HttpServletRequest request;

    public AuthorizationAspect(JwtUtil jwtUtil, HttpServletRequest request) {
        this.jwtUtil = jwtUtil;
        this.request = request;
    }

    @Around("@annotation(Authorized)")
    public Object authorize(ProceedingJoinPoint joinPoint) throws Throwable {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        String token = header.substring(7);

        Claims claims;
        try {
            claims = jwtUtil.parseToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }

        // (opciono) setovanje user-a u ThreadLocal
        //UserContext.setUsername(claims.getSubject());

        return joinPoint.proceed();
    }
}