package com.example.be_nwp.utils;

import com.example.be_nwp.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "mrSandmanBringMeADreamPamPamPamPamMakeHimTheCutestThatIveEverSeenGiveHimTwoLipsLikeRosesAndClover";

    public String generateToken(User user) {
        long EXPIRATION = 1000 * 60 * 60 * 24; // 1h*24
        //todo: dodati jos claimova?
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole())
                .claim("userId", user.getUserId())//?????
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    public Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
}
