package com.toy.gethertube.repository;

import com.toy.gethertube.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
    User findByUserId(String userId);
}
