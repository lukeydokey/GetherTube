package com.toy.gethertube.repository;

import com.toy.gethertube.entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoomRepo extends MongoRepository<Room, String> {
    Optional<Room> findByRoomId(String roomId);
}
