package com.lifelogmap.server.auth.infrastructure;

import com.lifelogmap.server.member.domain.Member;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret-key}")
    private String secret;
    @Value("${jwt.token.expire-length}")
    private long validityInMilliseconds;

    private SecretKey secretKey;

    private JwtParser parser;

    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
        this.parser = Jwts.parser()
                .verifyWith(secretKey)
                .build();
    }

    public String createToken(final Member member) {
        return Jwts.builder()
                .subject(member.getId().toString())
                .claim("name", member.getName())
                .signWith(secretKey)
                .compact();
    }

}
