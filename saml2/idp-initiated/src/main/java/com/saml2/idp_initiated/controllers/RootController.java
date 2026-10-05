package com.saml2.idp_initiated.controllers;

import org.springframework.security.saml2.provider.service.authentication.Saml2AssertionAuthentication;
import org.springframework.security.saml2.provider.service.authentication.Saml2ResponseAssertionAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootController {

    @GetMapping("/")
    public String index(Saml2AssertionAuthentication authentication, Model model) {
        Saml2ResponseAssertionAccessor assertion = authentication.getCredentials();
        model.addAttribute("registrationId", authentication.getRelyingPartyRegistrationId());
        model.addAttribute("nameId", assertion.getNameId());
        model.addAttribute("sessionIndexes", assertion.getSessionIndexes());
        model.addAttribute("attributes", assertion.getAttributes());
        return "index";
    }

}
