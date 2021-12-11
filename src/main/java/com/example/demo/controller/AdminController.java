package com.example.demo.controller;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Controller
@RequestMapping("/admin")
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

    @GetMapping()
    public String index(Model model1, @ModelAttribute("userNew") User user, Model model2) {
        model1.addAttribute("user", userService.findAll());
        model2.addAttribute("userAuth", userService.findUserByUserName(getCurrentUsername()));
        return "index2";
    }

    @PostMapping()
    public String create(@ModelAttribute("userNew") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }


    @PatchMapping("/{id}")
    public String update(@ModelAttribute("users") User user, @PathVariable("id") Long id) {
       userService.update(user, id);
        return "redirect:/admin";
    }



    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
