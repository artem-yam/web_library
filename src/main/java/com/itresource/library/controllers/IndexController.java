package com.itresource.library.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.InternalResourceView;

//@RestController
@RestController
//@RequestMapping("/library")
//@CrossOrigin(origins = "http://localhost:8081")
public class IndexController {
    
    @RequestMapping("/hello")
    public String helloPage() {
        return "index";
    }
    
    @RequestMapping("/index")
//    @ResponseBody
    public ModelAndView indexPage() {
//        return "Welcome to index library page!";
        ModelAndView modelAndView = new ModelAndView("index.jsp");
        modelAndView.setViewName("index");
        return modelAndView;
    }
    
}
