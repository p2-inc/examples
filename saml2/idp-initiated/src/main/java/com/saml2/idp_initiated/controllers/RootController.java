package com.saml2.idp_initiated.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.saml2.provider.service.authentication.Saml2AuthenticatedPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootController {

    @GetMapping("/")
    public String root(Model model, @AuthenticationPrincipal Saml2AuthenticatedPrincipal principal) {
        String name = principal.getName();
        model.addAttribute("name", name);

        return "index";
    }
}
