package com.example.demo.controller;

import com.example.demo.CustomErrorType;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RestApiController {

    public static final Logger logger= LoggerFactory.getLogger(RestApiController.class);

    @Autowired
    UserService userService;


    //---------Retrieve all Users--------
    @GetMapping(value ="/users/list")
    public ResponseEntity<List<User>>listAllUsers(){
        List<User> users = userService.findAllUsers();
        if(users.isEmpty()){
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }


    //---------Retrieve Single User---------
    @RequestMapping(value = "/user/{name}", method =RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("name")String name){

        logger.info("Fetching user with name {}",name);

        User user = userService.findByName(name);
        if(user != null){
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            logger.error("name {} not found",name);
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }


    //-------Create New User-----------
    @PostMapping(value ="/user/add/")
    public ResponseEntity<?> createOrUpdateUser(@RequestBody User user){
        logger.info("Creating User: {}", user);

        if(userService.isUserExist(user)){
            userService.updateUser(user);
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
        userService.createUser(user);

        return new ResponseEntity<String>(user.getName(), HttpStatus.CREATED);
    }


    //-------Update User-------
    @PutMapping(value ="/user/edit/{id}")
    public ResponseEntity<?> editUser(@PathVariable("id") long id, @RequestBody User user){
        logger.info("Updating User with id {}", id);

        User existingUser=userService.findById(id);
        if(existingUser==null){
            logger.error("User with id {} not found", id);
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        existingUser.setName(user.getName());
        existingUser.setAge(user.getAge());
        existingUser.setSalary(user.getSalary());

        userService.updateUser(existingUser);
        return new ResponseEntity<User>(existingUser, HttpStatus.OK);
    }


    //-------Delete User-------
    @DeleteMapping(value ="/user/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") long id){
        logger.info("Deleting User with id {}", id);

        User user = userService.findById(id);
        if(user == null){
            logger.error("User with id {} not found", id);
            return  new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        userService.deleteUserById(id);

        return  new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }
}
