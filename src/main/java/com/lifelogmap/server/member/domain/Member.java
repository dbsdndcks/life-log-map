package com.lifelogmap.server.member.domain;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    protected Member() {
    }

    public Member(
            final String email,
            final String password,
            final String name,
            final Role role
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

    public static Member toEntity(final String email, final String nickname, final Role role) {
        return new Member(email, null, nickname, role);
    }
}
