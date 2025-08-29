package com.lifelogmap.server.ui;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping()
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/map")
    public String map() {
        return "map";
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }
}
