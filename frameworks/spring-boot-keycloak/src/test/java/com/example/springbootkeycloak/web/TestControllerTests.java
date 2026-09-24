package com.example.springbootkeycloak.web;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.assertj.MockMvcTester;

import com.example.springbootkeycloak.config.SecurityConfig;

@WebMvcTest(TestController.class)
@Import(SecurityConfig.class)
class TestControllerTests {

    @Autowired
    private MockMvcTester mvc;

    @MockitoBean
    private JwtDecoder jwtDecoder;

    @Test
    void anonymousEndpointIsPublic() {
        assertThat(mvc.get().uri("/api/test/anonymous"))
                .hasStatusOk()
                .bodyJson().extractingPath("$.message").isEqualTo("Hello Anonymous");
    }

    @Test
    void userEndpointRequiresAToken() {
        assertThat(mvc.get().uri("/api/test/user"))
                .hasStatus(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void userEndpointRejectsATokenWithoutTheUserRole() {
        assertThat(mvc.get().uri("/api/test/user").with(jwt()))
                .hasStatus(HttpStatus.FORBIDDEN);
    }

    @Test
    void userEndpointAcceptsTheUserRole() {
        assertThat(mvc.get().uri("/api/test/user")
                .with(jwt().authorities(new SimpleGrantedAuthority("ROLE_user"))))
                .hasStatusOk()
                .bodyJson().extractingPath("$.message").isEqualTo("Hello Secured with user role.");
    }

    @Test
    void realmRolesOfABearerTokenAreMappedToSpringRoles() {
        given(jwtDecoder.decode("keycloak-token")).willReturn(Jwt.withTokenValue("keycloak-token")
                .header("alg", "RS256")
                .subject("3f1c2b9e-7d4a-4f0e-9a51-0c6d2e8b7a10")
                .claim("preferred_username", "test")
                .claim("realm_access", Map.of("roles", List.of("user", "default-roles-demo-realm")))
                .build());

        assertThat(mvc.get().uri("/api/test/user")
                .header(HttpHeaders.AUTHORIZATION, "Bearer keycloak-token"))
                .hasStatusOk()
                .bodyJson().extractingPath("$.user").isEqualTo("test");
    }

    @Test
    void corsAllowsTheAngularClient() {
        assertThat(mvc.options().uri("/api/test/user")
                .header(HttpHeaders.ORIGIN, "http://localhost:4200")
                .header(HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD, "GET")
                .header(HttpHeaders.ACCESS_CONTROL_REQUEST_HEADERS, "authorization"))
                .hasStatusOk()
                .hasHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "http://localhost:4200");
    }

    @Test
    void corsRejectsOtherOrigins() {
        assertThat(mvc.options().uri("/api/test/user")
                .header(HttpHeaders.ORIGIN, "https://other.example")
                .header(HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD, "GET"))
                .hasStatus(HttpStatus.FORBIDDEN);
    }

    @Test
    void pathsOutsideTheApiAreDenied() {
        assertThat(mvc.get().uri("/actuator").with(jwt()))
                .hasStatus(HttpStatus.FORBIDDEN);
    }
}
