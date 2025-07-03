package com.lifelogmap.server.auth.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KakaoProfile(
        String id,
        @JsonProperty("connected_at")
        String connectedAt,
        @JsonProperty("kakao_account")
        KakaoAccount kakaoAccount
) {


        public String getEmail() {
                return kakaoAccount.email();
        }

}
