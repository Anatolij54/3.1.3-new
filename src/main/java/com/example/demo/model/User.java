package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @Column(name = "user_name")
//    @Length(min = 5, message = "*Your user name must have at least 5 characters")
//    @NotEmpty(message = "*Please provide a user name")
    private String userName;
    @Column(name = "user_last")
//    @Length(min = 5, message = "*Your user name must have at least 5 characters")
//    @NotEmpty(message = "*Please provide a user name")
    private String userLastName;
    @Column(name = "age")
    private byte age;
    @Column(name = "email")
//    @Email(message = "*Please provide a valid Email")
//    @NotEmpty(message = "*Please provide an email")
    private String email;
    @Column(name = "password")
//    @Length(min = 5, message = "*Your password must have at least 5 characters")
//    @NotEmpty(message = "*Please provide your password")
    private String password;
    @Column(name = "active")
    private Boolean active;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    public void setRoleSet(Set<Role> roleSet){
        roles = roleSet;
    }

    public void setRoles(String[] roles) {
        Set<Role> roleSet = new HashSet<>();
        for (String role : roles) {
            Role roleNew = new Role();
            roleNew.setRole(role);
            roleSet.add(roleNew);
        }
        this.roles = roleSet;
    }
}