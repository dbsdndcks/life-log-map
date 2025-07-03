package com.lifelogmap.server.auth.config;

import com.lifelogmap.server.auth.infrastructure.LoginMemberArgumentResolver;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

public class WebMvcConfiguration implements WebMvcConfigurer{

    private final LoginMemberArgumentResolver loginMemberArgumentResolver;

    public WebMvcConfiguration(final LoginMemberArgumentResolver loginMemberArgumentResolver) {
        this.loginMemberArgumentResolver = loginMemberArgumentResolver;
    }

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginMemberArgumentResolver);
    }

}
