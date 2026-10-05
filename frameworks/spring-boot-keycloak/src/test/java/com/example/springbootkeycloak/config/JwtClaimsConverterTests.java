package com.example.springbootkeycloak.config;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

class JwtClaimsConverterTests {

    private final JwtClaimsConverter converter = new JwtClaimsConverter();

    @Test
    void mapsRealmRolesToAuthoritiesAndUsesThePreferredUsername() {
        var authentication = converter.convert(jwt(Map.of(
                "preferred_username", "test",
                "realm_access", Map.of("roles", List.of("user", "offline_access")))));

        assertThat(authentication.getName()).isEqualTo("test");
        assertThat(authentication.getAuthorities())
                .extracting(GrantedAuthority::getAuthority)
                .containsExactlyInAnyOrder("ROLE_user", "ROLE_offline_access");
    }

    @Test
    void grantsNoAuthoritiesWithoutRealmRoles() {
        var authentication = converter.convert(jwt(Map.of("scope", "openid")));

        assertThat(authentication.getName()).isEqualTo("subject");
        assertThat(authentication.getAuthorities()).isEmpty();
    }

    @Test
    void ignoresMalformedRealmAccessClaims() {
        assertThat(converter.convert(jwt(Map.of("realm_access", "user"))).getAuthorities()).isEmpty();
        assertThat(converter.convert(jwt(Map.of("realm_access", Map.of("roles", "user")))).getAuthorities())
                .isEmpty();
    }

    private static Jwt jwt(Map<String, Object> claims) {
        return Jwt.withTokenValue("token")
                .header("alg", "RS256")
                .subject("subject")
                .claims(existing -> existing.putAll(claims))
                .build();
    }
}
