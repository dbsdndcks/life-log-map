package com.lifelogmap.server.auth.controller;

import com.lifelogmap.server.auth.dto.TokenResponse;
import com.lifelogmap.server.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        
        TokenResponse tokenResponse = authService.loginWithEmail(email, password);
        return ResponseEntity.ok().body(tokenResponse);
    }

    @PostMapping("/signup")
    public ResponseEntity<TokenResponse> signup(@RequestBody Map<String, String> signupRequest) {
        String name = signupRequest.get("name");
        String email = signupRequest.get("email");
        String password = signupRequest.get("password");
        
        TokenResponse tokenResponse = authService.signup(name, email, password);
        return ResponseEntity.ok().body(tokenResponse);
    }

    @GetMapping("/login/oauth2/kakao")
    public ResponseEntity<TokenResponse> loginWithKakao(@RequestParam("code") String code) {
        TokenResponse tokenResponse = authService.loginWithOauth(code);
        return ResponseEntity.ok().body(tokenResponse);
    }
}