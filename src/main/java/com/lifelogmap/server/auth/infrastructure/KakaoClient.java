package com.lifelogmap.server.auth.infrastructure;

import com.lifelogmap.server.auth.dto.KakaoProfile;
import com.lifelogmap.server.auth.dto.KakaoToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Component
public class KakaoClient {

    @Value("${spring.oauth.client-id}")
    private String clientId;
    @Value("${spring.oauth.client-secret}")
    private String clientSecret;
    private final static String REDIRECT_URI = "http://localhost:8080/login/oauth2/kakao";
    private final static String ACCESS_TOKEN_URI = "https://kauth.kakao.com/oauth/token";
    private final static String USER_INFO_URI = "https://kapi.kakao.com/v2/user/me";

    private final RestClient restClient;

    public KakaoClient(final RestClient restClient) {
        this.restClient = restClient;
    }

    public KakaoToken getAccessToken(String authorizationCode) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id",clientId );
        body.add("redirect_uri", REDIRECT_URI);
        body.add("code", authorizationCode);
        body.add("client_secret", clientSecret);

        return restClient.post()
                .uri(ACCESS_TOKEN_URI)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(body)
                .retrieve()
                .body(KakaoToken.class);

    }

    public KakaoProfile findUserInfo(final KakaoToken kakaoToken) {
        return restClient.get()
                .uri(USER_INFO_URI)
                .header("Authorization", "Bearer " + kakaoToken.accessToken())
                .retrieve()
                .body(KakaoProfile.class);
    }
}
