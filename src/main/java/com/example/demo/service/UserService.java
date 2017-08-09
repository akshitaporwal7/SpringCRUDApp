package com.example.demo.service;

import com.example.demo.model.User;

import java.util.List;

public interface UserService {

    User findById(Long id);

    User findByName(String  name);

    void createUser(User user);

    void updateUser(User user);

    void deleteUserById(Long id);

    List<User>findAllUsers();

    boolean isUserExist(User user);
}
