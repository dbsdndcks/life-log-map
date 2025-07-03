package com.lifelogmap.server.auth.controller;

import com.lifelogmap.server.auth.infrastructure.dto.TokenResponse;
import com.lifelogmap.server.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/login/oauth2")
public class AuthController {

    private final AuthService authService;

    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/kakao")
    public ResponseEntity<TokenResponse> loginWithKakao(@RequestParam("code") String code) {
        TokenResponse tokenResponse = authService.loginWithOauth(code);
        return ResponseEntity.ok().body(tokenResponse);
    }
}