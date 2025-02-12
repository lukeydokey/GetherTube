package com.toy.gethertube.controller;

import com.toy.gethertube.dto.room.RoomMemberReqDto;
import com.toy.gethertube.dto.room.RoomPlaylistAddReqDto;
import com.toy.gethertube.dto.room.RoomPlaylistUpdateReqDto;
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
@RequestMapping("/rooms")
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

    @DeleteMapping("/{roomId}")
    @Operation(summary = "룸 삭제")
    public ResponseEntity<?> deleteRoom(@AuthenticationPrincipal UserDetails user, @PathVariable("roomId") String roomId) {
        return roomService.deleteRoom(user.getUsername(), roomId);
    }

    @PostMapping("/{roomId}/member")
    @Operation(summary = "룸 멤버 추가")
    public ResponseEntity<?> addRoomMember(@PathVariable("roomId") String roomId, @AuthenticationPrincipal UserDetails userDetails) {
        return roomService.addRoomMember(roomId, userDetails.getUsername());
    }


    @PutMapping("/{roomId}/member")
    @Operation(summary = "룸 멤버 수정")
    public ResponseEntity<?> updateRoomMember(@PathVariable("roomId") String roomId,
                                              @AuthenticationPrincipal UserDetails userDetails,
                                              @RequestBody RoomMemberReqDto roomMemberReqDto) {
        return roomService.updateRoomMember(roomId, userDetails.getUsername(), roomMemberReqDto);
    }

    @DeleteMapping("/{roomId}/member")
    @Operation(summary = "룸 멤버 삭제")
    public ResponseEntity<?> deleteRoomMember(@PathVariable("roomId") String roomId,
                                              @AuthenticationPrincipal UserDetails userDetails,
                                              @RequestBody RoomMemberReqDto roomMemberReqDto) {
        return roomService.deleteRoomMember(roomId, userDetails.getUsername(), roomMemberReqDto.getUserId());
    }
  
    @GetMapping("/{roomId}/memberCheck")
    @Operation(summary = "룸 멤버 여부 확인")
    public ResponseEntity<?> checkRoomMember(@PathVariable("roomId") String roomId,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        return roomService.checkRoomMember(roomId, userDetails.getUsername());
    }


    @PostMapping("/{roomId}/playlist")
    @Operation(summary = "룸 플레이리스트 추가")
    public ResponseEntity<?> addRoomPlaylist(@PathVariable("roomId") String roomId,
                                             @AuthenticationPrincipal UserDetails userDetails,
                                             @RequestBody RoomPlaylistAddReqDto reqDto) {
        return roomService.addRoomPlaylist(roomId, userDetails.getUsername(), reqDto.getPlaylistUrl());
    }

    @PatchMapping("/{roomId}/playlist")
    @Operation(summary = "룸 플레이리스트 수정")
    public ResponseEntity<?> updateRoomPlaylist(@PathVariable("roomId") String roomId,
                                                @AuthenticationPrincipal UserDetails userDetails,
                                                @RequestBody RoomPlaylistUpdateReqDto reqDto) {
        return roomService.updateRoomPlaylist(roomId, userDetails.getUsername(), reqDto.getNewPlaylist());
    }

    @DeleteMapping("/{roomId}/playlist/{index}")
    @Operation(summary = "룸 플레이리스트 삭제")
    public ResponseEntity<?> deleteRoomPlaylist(@PathVariable("roomId") String roomId,
                                                @AuthenticationPrincipal UserDetails userDetails,
                                              @PathVariable("index") int index) {
        return roomService.deleteRoomPlaylist(roomId, userDetails.getUsername(), index);
    }

}
