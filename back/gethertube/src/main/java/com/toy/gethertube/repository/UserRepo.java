package com.toy.gethertube.repository;

import com.toy.gethertube.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findOneByUserId(String userId);
}
