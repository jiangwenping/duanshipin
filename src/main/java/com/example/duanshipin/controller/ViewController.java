package com.example.duanshipin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ViewController {

    @RequestMapping("")
    public String home() {
        return "/vue-admin/index";
    }

    @RequestMapping("/test")
    @ResponseBody
    public String test() {
        return "abc";
    }

}
