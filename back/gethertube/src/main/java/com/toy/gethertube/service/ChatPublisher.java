package com.toy.gethertube.service;

import com.toy.gethertube.dto.chat.ChatDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "ChatPublisher")
public class ChatPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(String channel, ChatDto chatDto){
        redisTemplate.convertAndSend(channel, chatDto);

        String key = "chat:" + chatDto.getRoomId();
        redisTemplate.opsForList().rightPush(key, chatDto);
        redisTemplate.expire(key, Duration.ofHours(1));
    }
}
