package com.toy.gethertube.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@Tag(name = "Test", description = "Swagger Test API")
public class testController {

    @GetMapping("")
    public String test() {
        return "Hello World";
    }
}
