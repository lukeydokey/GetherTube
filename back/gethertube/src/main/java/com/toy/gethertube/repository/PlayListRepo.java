package com.toy.gethertube.repository;

import com.toy.gethertube.entity.PlayList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlayListRepo extends MongoRepository<PlayList, String> {
    PlayList findOneByUserId(String userId);
}
