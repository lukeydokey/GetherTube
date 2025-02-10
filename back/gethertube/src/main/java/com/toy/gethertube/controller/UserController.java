package com.toy.gethertube.controller;

import com.toy.gethertube.dto.user.LoginDto;
import com.toy.gethertube.dto.user.UserReqDto;
import com.toy.gethertube.dto.user.UserUpdateReqDto;
import com.toy.gethertube.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Tag(name = "User", description = "User API")
@Slf4j(topic = "User Controller")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @Operation(summary = "회원가입")
    public ResponseEntity<?> register(@RequestBody UserReqDto userReqDto) {
        return userService.save(userReqDto);
    }

    @PostMapping("/login")
    @Operation(summary = "로그인")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto);
    }

    @GetMapping
    @Operation(summary = "회원 정보 조회")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.getUserInfo(userDetails.getUsername());
    }

    @PutMapping
    @Operation(summary = "회원 정보 수정")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserUpdateReqDto userDto, @AuthenticationPrincipal UserDetails userDetails) {
        return userService.updateUserInfo(userDto, userDetails.getUsername());
    }

    @DeleteMapping
    @Operation(summary = "회원 정보 삭제")
    public ResponseEntity<?> deleteUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.deleteUser(userDetails.getUsername());
    }

    @PostMapping("/idCheck")
    @Operation(summary = "아이디 중복 확인")
    public ResponseEntity<?> idCheck(@RequestBody UserReqDto userReqDto) {
        log.info("ID Check: {}", userReqDto.getUserId());
        return userService.checkUserId(userReqDto.getUserId());
    }

    @PostMapping("/nickCheck")
    @Operation(summary = "닉네임 중복 확인")
    public ResponseEntity<?> nickCheck(@RequestBody UserReqDto userReqDto) {
        return userService.checkNickName(userReqDto.getNickName());
    }
}
