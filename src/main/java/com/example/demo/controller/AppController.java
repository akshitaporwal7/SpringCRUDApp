package com.example.demo.controller;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class AppController {

    @RequestMapping("/")
    public ModelAndView index(){
        return new ModelAndView("/index");
    }
}
