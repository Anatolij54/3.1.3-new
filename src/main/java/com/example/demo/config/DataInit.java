package com.example.demo.config;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashSet;

@Component
public class DataInit {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public DataInit(UserRepository userRepository,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }



    @PostConstruct
   private void rolemetod(){
        Role rUser = new Role("USER");
        Role rAdmin = new Role("ADMIN");

        User u1 = new User();
        u1.setAge((byte)1);
        u1.setUserName("34324");
        u1.setUserLastName("111");
        u1.setActive(true);
        u1.setEmail("11");
        u1.setPassword("xxx");
        u1.setRoleSet(new HashSet<>());
        u1.getRoles().add(rUser);
        userRepository.save(u1);

        User u2 = new User();
        u2.setAge((byte)1);
        u2.setUserLastName("222");
        u2.setActive(true);
        u2.setUserName("3432458");
        u2.setEmail("22");
        u2.setPassword("xxx");
        u2.setRoleSet(new HashSet<>());
        u2.getRoles().add(rAdmin);
        userRepository.save(u2);

        u2.getRoles().add(rUser);
        userRepository.save(u2);
    }
}
