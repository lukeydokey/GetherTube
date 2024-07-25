package com.toy.gethertube.service;

import com.toy.gethertube.dto.LoginDto;
import com.toy.gethertube.dto.LoginResDto;
import com.toy.gethertube.dto.UserDto;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.UserRepo;
import com.toy.gethertube.util.JwtUtil;
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
    public UserDto save(UserDto userDto) {
        userDto.setPassWord(passwordEncoder.encode(userDto.getPassWord())); // 패스워드 인코딩
        User user = userDto.toEntity();
        return userRepository.save(user).toUserDto();
    }

    @Transactional
    public ResponseEntity<LoginResDto> login(LoginDto loginDto) {
        String userId = loginDto.getUserId();
        String password = loginDto.getPassword();
        User user = userRepository.findOneByUserId(userId).orElse(null);
        // userId
        if (user == null) {
            log.error("등록된 사용자가 없습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResDto());
        }
        // 패스워드
        if (!passwordEncoder.matches(password, user.getPassWord())) {
            log.error("비밀번호가 일치하지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResDto());
        }

        String accessToken = jwtUtil.createAccessToken(user.toUserDto());
        LoginResDto loginResDto = LoginResDto.builder()
                .userId(user.getUserId())
                .nickName(user.getNickName())
                .accessToken(accessToken)
                .build();

        return ResponseEntity.ok(loginResDto);
    }
}
