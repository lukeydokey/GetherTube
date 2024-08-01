package com.toy.gethertube.service;

import com.toy.gethertube.dto.LoginDto;
import com.toy.gethertube.dto.LoginResDto;
import com.toy.gethertube.dto.UserDto;
import com.toy.gethertube.dto.UserUpdateReqDto;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.UserRepo;
import com.toy.gethertube.util.JwtUtil;
import com.toy.gethertube.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
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
    public ResponseEntity<?> save(UserDto userDto) {
        userDto.setPassWord(passwordEncoder.encode(userDto.getPassWord())); // 패스워드 인코딩
        User user = userDto.toEntity();

        return ResponseEntity.ok(ResponseUtil.success("회원 가입 성공", userRepository.save(user).toUserDto()));
    }

    @Transactional
    public ResponseEntity<?> login(LoginDto loginDto) {
        String userId = loginDto.getUserId();
        String password = loginDto.getPassword();
        User user = userRepository.findOneByUserId(userId).orElse(null);
        // 로그인 정보 일치 확인
        if (user == null || !passwordEncoder.matches(password, user.getPassWord())) {
            log.error("아이디 혹은 비밀번호가 일치하지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ResponseUtil.error( "아이디 혹은 비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED.value()));
        }

        String accessToken = jwtUtil.createAccessToken(user.toUserDto());
        LoginResDto loginResDto = LoginResDto.builder()
                .userId(user.getUserId())
                .nickName(user.getNickName())
                .accessToken(accessToken)
                .build();

        return ResponseEntity.ok(ResponseUtil.success("로그인 성공", loginResDto));
    }

    public ResponseEntity<?> getUserInfo(String userId) {
        User user = userRepository.findOneByUserId(userId).orElse(null);
        return ResponseEntity.ok(ResponseUtil.success("회원 정보 조회 성공", user.toUserDto()));
    }

    @Transactional
    public ResponseEntity<?> updateUserInfo(UserUpdateReqDto userDto, String userId) {
        User user = userRepository.findOneByUserId(userId).orElse(null);
        user.setNickName(userDto.getNickName());
        user.setChatColor(userDto.getChatColor());
        return ResponseEntity.ok(ResponseUtil.success("회원 정보 수정 성공", userRepository.save(user).toUserDto()));
    }
}
