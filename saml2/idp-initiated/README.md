# Spring boot SAML 2.0 Idp-initiated flow example

This project was generated with [Spring Initializr](https://start.spring.io/). Contributions and corrections are welcome as pull requests.

### Local Development

1. Start a Keycloak instance locally. (e.q: http://localhost:8080/) .
2. Go to your OKTA tenant and add a new SAML 2.0 application  with the following:\
   ```Single sign-on URL```: http://localhost:8080/realms/test-realm/broker/okta-broker/endpoint/clients/okta-client \
   ```Audience URI (SP Entity ID)```: http://localhost:8080/realms/test-realm
3. Import realm in file: `/keycloak/test-realm-export.json`\
   You will need to change the ```singleSignOnServiceUrl``` with the one found in the metadata from OKTA application created at step 1
4. Import saml-client: `/keycloak/saml-client.json`
5. Run project using: `mvn:bootRun`
6. Start authentication from OKTA application page
