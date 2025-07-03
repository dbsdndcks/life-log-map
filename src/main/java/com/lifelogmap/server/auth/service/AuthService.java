package com.lifelogmap.server.auth.service;

import com.lifelogmap.server.auth.infrastructure.JwtTokenProvider;
import com.lifelogmap.server.auth.infrastructure.KakaoClient;
import com.lifelogmap.server.auth.infrastructure.dto.KakaoProfile;
import com.lifelogmap.server.auth.infrastructure.dto.KakaoToken;
import com.lifelogmap.server.auth.infrastructure.dto.TokenResponse;
import com.lifelogmap.server.member.domain.Member;
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
}
