package com.lifelogmap.server.member.service;

import com.lifelogmap.server.auth.infrastructure.dto.KakaoAccount;
import com.lifelogmap.server.auth.infrastructure.dto.KakaoProfile;
import com.lifelogmap.server.member.domain.Member;
import com.lifelogmap.server.member.domain.Role;
import com.lifelogmap.server.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(final MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public boolean isExistEmail(final String email) {
        return memberRepository.existsByEmail(email);
    }

    public void signUp(final KakaoProfile kakaoProfile) {
        KakaoAccount account = kakaoProfile.kakaoAccount();
        Member member = Member.toEntity(
                account.email(),
                account.profile().nickname(),
                Role.USER
                );
        memberRepository.save(member);
    }

    public Member findByEmail(final String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당하는 회원을 찾을 수 없습니다."));
    }
}
