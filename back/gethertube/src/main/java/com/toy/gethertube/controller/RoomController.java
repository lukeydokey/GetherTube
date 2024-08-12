package com.toy.gethertube.controller;

import com.toy.gethertube.entity.Room;
import com.toy.gethertube.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/room")
@Tag(name = "Room", description = "Room API")
@Slf4j(topic = "Room Controller")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    @Operation(summary = "룸 생성")
    public ResponseEntity<?> createRoom(@AuthenticationPrincipal UserDetails user) {
        return roomService.createRoom(user.getUsername());
    }

}
