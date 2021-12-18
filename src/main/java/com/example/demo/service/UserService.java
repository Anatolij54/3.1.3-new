package com.example.demo.service;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public User saveUser(User user) {
        user.setActive(true);
        return userRepository.save(user);
    }

    public Role saveRole(Role role){
        return roleRepository.save(role);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User getUserById(Long id){

        try {
            User user = userRepository.findById(id).get();
        } catch (RuntimeException e){
            return null;
        }

        return userRepository.findById(id).get();
    }

    public User update(User user){
        User newUser = getUserById(user.getId());
        newUser.setUserName(user.getUserName());
        newUser.setEmail(user.getEmail());
        newUser.setUserLastName(user.getUserLastName());
        newUser.setPassword(user.getPassword());
        newUser.setAge(user.getAge());
        newUser.setActive(true);
        newUser.setRoleSet(user.getRoles());
        return userRepository.save(newUser);
    }

public void deleteUser(Long id){
        userRepository.deleteById(id);
}

}
