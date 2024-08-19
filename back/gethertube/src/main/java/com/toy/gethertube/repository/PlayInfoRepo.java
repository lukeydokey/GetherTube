package com.toy.gethertube.repository;

import com.toy.gethertube.entity.PlayInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlayInfoRepo extends MongoRepository<PlayInfo, String> {
}
