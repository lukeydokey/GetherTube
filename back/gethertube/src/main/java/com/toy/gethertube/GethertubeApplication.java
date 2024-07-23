package com.toy.gethertube;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
@SpringBootApplication
public class GethertubeApplication {

    public static void main(String[] args) {
        SpringApplication.run(GethertubeApplication.class, args);
    }

}
