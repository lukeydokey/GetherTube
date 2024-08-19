package com.toy.gethertube.controller;

import com.toy.gethertube.dto.room.RoomMemberReqDto;
import com.toy.gethertube.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{roomId}")
    @Operation(summary = "룸 정보 조회")
    public ResponseEntity<?> getRoom(@AuthenticationPrincipal UserDetails user, @PathVariable("roomId") String roomId) {
        return roomService.getRoom(roomId);
    }

    @PostMapping("/member/{roomId}")
    @Operation(summary = "룸 멤버 추가")
    public ResponseEntity<?> addRoomMember(@PathVariable("roomId") String roomId, @AuthenticationPrincipal UserDetails userDetails) {
        return roomService.addRoomMember(roomId, userDetails.getUsername());
    }

    @PutMapping("/member/{roomId}")
    @Operation(summary = "룸 멤버 수정")
    public ResponseEntity<?> updateRoomMember(@PathVariable("roomId") String roomId,
                                              @AuthenticationPrincipal UserDetails userDetails,
                                              @RequestBody RoomMemberReqDto roomMemberReqDto) {
        return roomService.updateRoomMember(roomId, userDetails.getUsername(), roomMemberReqDto);
    }

}
