package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class AdminController {
    private UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    public String getCurrentUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }


    @GetMapping("/admin")
    public String getIndex(Model model2) {
        model2.addAttribute("userAuth", userService.findUserByUserName(getCurrentUsername()));
        return "pages/index";
    }

    @GetMapping("/user")
    public String getUser(Model model2) {
        model2.addAttribute("userAuth", userService.findUserByUserName(getCurrentUsername()));
        return "pages/user";
    }


}
