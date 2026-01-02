package com.example.be_nwp.dtos;

public record LoginRequest(
        String username,
        String passwordHash
) {}
