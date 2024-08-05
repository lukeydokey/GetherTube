package com.toy.gethertube.service;

import com.toy.gethertube.dto.user.LoginDto;
import com.toy.gethertube.dto.user.LoginResDto;
import com.toy.gethertube.dto.user.UserReqDto;
import com.toy.gethertube.dto.user.UserUpdateReqDto;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.UserRepo;
import com.toy.gethertube.util.JwtUtil;
import com.toy.gethertube.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j(topic = "UserService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepo userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<?> save(UserReqDto userReqDto) {
        userReqDto.setPassword(passwordEncoder.encode(userReqDto.getPassword())); // 패스워드 인코딩
        User user = userReqDto.toEntity();

        try{
            return ResponseEntity.ok(ResponseUtil.success("회원 가입 성공", userRepository.save(user).toUserResDto()));
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseUtil.error("잘못된 요청입니다.", HttpStatus.BAD_REQUEST.value()));
        }
    }

    @Transactional
    public ResponseEntity<?> login(LoginDto loginDto) {
        String userId = loginDto.getUserId();
        String password = loginDto.getPassword();
        User user = userRepository.findOneByUserId(userId).orElse(null);
        // 로그인 정보 일치 확인
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            log.error("아이디 혹은 비밀번호가 일치하지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ResponseUtil.error( "아이디 혹은 비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED.value()));
        }

        String accessToken = jwtUtil.createAccessToken(loginDto);
        LoginResDto loginResDto = LoginResDto.builder()
                .userId(user.getUserId())
                .nickName(user.getNickName())
                .accessToken(accessToken)
                .build();

        return ResponseEntity.ok(ResponseUtil.success("로그인 성공", loginResDto));
    }

    public ResponseEntity<?> getUserInfo(String userId) {
        User user = userRepository.findOneByUserId(userId).orElse(null);
        return ResponseEntity.ok(ResponseUtil.success("회원 정보 조회 성공", user.toUserResDto()));
    }

    @Transactional
    public ResponseEntity<?> updateUserInfo(UserUpdateReqDto userDto, String userId) {
        User user = userRepository.findOneByUserId(userId).orElse(null);
        user.setNickName(userDto.getNickName());
        user.setChatColor(userDto.getChatColor());
        try{
            return ResponseEntity.ok(ResponseUtil.success("회원 정보 수정 성공", userRepository.save(user).toUserResDto()));
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseUtil.error("잘못된 요청입니다.", HttpStatus.BAD_REQUEST.value()));
        }
    }

    @Transactional
    public ResponseEntity<?> deleteUser(String userId) {
        userRepository.deleteByUserId(userId);
        return ResponseEntity.ok(ResponseUtil.success("회원 정보 삭제 성공", "User Info Deleted"));
    }

    @Transactional
    public ResponseEntity<?> checkUserId(String userId) {
        User user = userRepository.findOneByUserId(userId).orElse(null);
        if(user == null) {
            return ResponseEntity.ok(ResponseUtil.success("아이디 중복 확인 성공", "Success"));
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseUtil.error( "중복인 아이디가 존재 합니다.", HttpStatus.BAD_REQUEST.value()));
        }
    }

    @Transactional
    public ResponseEntity<?> checkNickName(String nickName) {
        User user = userRepository.findOneByNickName(nickName).orElse(null);
        if(user == null) {
            return ResponseEntity.ok(ResponseUtil.success("닉네임 중복 확인 성공", "Success"));
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseUtil.error( "중복인 닉네임이 존재 합니다.", HttpStatus.BAD_REQUEST.value()));
        }
    }
}
