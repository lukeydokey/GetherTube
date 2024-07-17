package com.toy.gethertube.controller;

import com.toy.gethertube.dto.UserDto;
import com.toy.gethertube.service.TestService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@Tag(name = "Test", description = "Swagger Test API")
@Slf4j
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @GetMapping("")
    public String test() {
        return "Hello World";
    }

    @GetMapping("/mongo")
    public UserDto mongoTest(@RequestHeader(value = "userId") String userId){
        return testService.getUserInfo(userId);
    }
}
