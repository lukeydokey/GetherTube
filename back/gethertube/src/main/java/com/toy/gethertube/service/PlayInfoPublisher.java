package com.toy.gethertube.service;

import com.toy.gethertube.dto.playinfo.PlayInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "PlayInfoPublisher")
public class PlayInfoPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(String channel, PlayInfoDto playInfoDto) {
        redisTemplate.convertAndSend(channel, playInfoDto);

        String key = "playinfo:" + playInfoDto.getRoomId();
        redisTemplate.opsForValue().set(key, playInfoDto, Duration.ofHours(1));
    }

}
