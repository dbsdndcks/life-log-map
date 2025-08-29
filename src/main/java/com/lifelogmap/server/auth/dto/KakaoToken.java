package com.lifelogmap.server.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KakaoToken(
        @JsonProperty("access_token")
        String accessToken,
        @JsonProperty("refresh_token")
        String refreshToken,
        @JsonProperty("token_type")
        String tokenType,
        @JsonProperty("expires_int")
        int expiresInt,
        String scope,
        @JsonProperty("refresh_token_expires_int")
        int refreshTokenExpiresInt
) {
}
