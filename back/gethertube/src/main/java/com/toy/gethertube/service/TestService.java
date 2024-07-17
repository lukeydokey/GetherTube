package com.toy.gethertube.service;

import com.toy.gethertube.dto.UserDto;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class TestService {

    private final UserRepo userRepository;

    public UserDto getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId);
        return user.toUserDto();
    }
}
