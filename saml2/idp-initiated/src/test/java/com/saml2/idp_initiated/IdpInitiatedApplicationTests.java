package com.saml2.idp_initiated;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.xpath;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.core.AuthenticatedPrincipal;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.saml2.provider.service.authentication.Saml2AssertionAuthentication;
import org.springframework.security.saml2.provider.service.authentication.Saml2ResponseAssertion;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class IdpInitiatedApplicationTests {

    private static final Map<String, String> METADATA_NAMESPACE = Map.of("md", "urn:oasis:names:tc:SAML:2.0:metadata");

    @Autowired
    private MockMvc mvc;

    @Test
    void publishesServiceProviderMetadata() throws Exception {
        mvc.perform(get("/saml2/metadata"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith("application/samlmetadata+xml"))
                .andExpect(xpath("/md:EntityDescriptor/@entityID", METADATA_NAMESPACE)
                        .string("http://localhost/saml2/metadata"))
                .andExpect(xpath("//md:AssertionConsumerService/@Location", METADATA_NAMESPACE)
                        .string("http://localhost/login/saml2/sso"))
                .andExpect(xpath("//md:SingleLogoutService/@Location", METADATA_NAMESPACE)
                        .string("http://localhost/logout/saml2/slo"));
    }

    @Test
    void publishesMetadataUnderTheRegistrationId() throws Exception {
        mvc.perform(get("/saml2/metadata/keycloak"))
                .andExpect(status().isOk())
                .andExpect(xpath("/md:EntityDescriptor/@entityID", METADATA_NAMESPACE)
                        .string("http://localhost/saml2/metadata"));
    }

    @Test
    void redirectsAnonymousUsersToTheSamlLogin() throws Exception {
        mvc.perform(get("/"))
                .andExpect(status().isFound())
                .andExpect(redirectedUrl("/saml2/authenticate?registrationId=keycloak"));
    }

    @Test
    void sendsAuthenticationRequestsToKeycloak() throws Exception {
        mvc.perform(get("/saml2/authenticate").param("registrationId", "keycloak"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("action=\"http://localhost:8080/realms/test-realm/protocol/saml\"")))
                .andExpect(content().string(containsString("name=\"SAMLRequest\"")));
    }

    @Test
    void showsTheSamlAssertionToAuthenticatedUsers() throws Exception {
        Map<String, List<Object>> attributes = Map.of("email", List.of("test@example.com"));
        Saml2ResponseAssertion assertion = Saml2ResponseAssertion.withResponseValue("<samlp:Response/>")
                .nameId("test")
                .sessionIndexes(List.of("session-1"))
                .attributes(attributes)
                .build();
        AuthenticatedPrincipal principal = () -> "test";
        Saml2AssertionAuthentication user = new Saml2AssertionAuthentication(principal, assertion,
                AuthorityUtils.createAuthorityList("ROLE_USER"), "keycloak");

        mvc.perform(get("/").with(authentication(user)))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Authenticated")))
                .andExpect(content().string(containsString("Logged in as <strong>test</strong>")))
                .andExpect(content().string(containsString("test@example.com")))
                .andExpect(content().string(containsString("session-1")));
    }

}
