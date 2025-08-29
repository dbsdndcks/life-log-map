package com.lifelogmap.server.auth.service;

import com.lifelogmap.server.auth.infrastructure.JwtTokenProvider;
import com.lifelogmap.server.auth.infrastructure.KakaoClient;
import com.lifelogmap.server.auth.dto.KakaoProfile;
import com.lifelogmap.server.auth.dto.KakaoToken;
import com.lifelogmap.server.auth.dto.TokenResponse;
import com.lifelogmap.server.member.domain.Member;
import com.lifelogmap.server.member.domain.Role;
import com.lifelogmap.server.member.service.MemberService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final KakaoClient kakaoClient;
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(
            final KakaoClient kakaoClient,
            final MemberService memberService,
            final JwtTokenProvider jwtTokenProvider
    ) {
        this.kakaoClient = kakaoClient;
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public TokenResponse loginWithEmail(final String email, final String password) {
        // 이메일로 회원 조회
        Member member = memberService.findByEmail(email);
        
        // 비밀번호 검증 (실제 구현에서는 암호화된 비밀번호와 비교)
        if (member == null || !isValidPassword(password, member)) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        
        // JWT 토큰 생성
        String tokenValue = jwtTokenProvider.createToken(member);
        return new TokenResponse(tokenValue);
    }

    public TokenResponse loginWithOauth(final String code) {
        KakaoToken accessToken = kakaoClient.getAccessToken(code);
        KakaoProfile userInfo = kakaoClient.findUserInfo(accessToken);
        if (!memberService.isExistEmail(userInfo.getEmail())) {
            memberService.signUp(userInfo);
        }
        Member member = memberService.findByEmail(userInfo.getEmail());
        String tokenValue = jwtTokenProvider.createToken(member);
        return new TokenResponse(tokenValue);
    }

    public TokenResponse signup(final String name, final String email, final String password) {
        // 이메일 중복 확인
        if (memberService.isExistEmail(email)) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        
        // 회원 생성
        Member member = new Member(email, password, name, Role.USER);
        memberService.save(member);
        
        // JWT 토큰 생성
        String tokenValue = jwtTokenProvider.createToken(member);
        return new TokenResponse(tokenValue);
    }

    private boolean isValidPassword(String password, Member member) {
        // 실제 구현에서는 암호화된 비밀번호와 비교해야 함
        // 현재는 간단한 예시로 구현
        return member.getPassword() != null && member.getPassword().equals(password);
    }
}
