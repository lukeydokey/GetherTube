package com.toy.gethertube.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toy.gethertube.dto.chat.ChatDto;
import com.toy.gethertube.dto.playinfo.PlayInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "PlayInfoSubscriber")
public class PlayInfoSubscriber implements MessageListener {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        log.info("Message received: {}", message);
        String publishMessage = redisTemplate
                .getStringSerializer().deserialize(message.getBody());

        try {
            PlayInfoDto playInfoDto = objectMapper.readValue(publishMessage, PlayInfoDto.class);
            log.info("Subscribed Channel: /sub/playInfos/{}", playInfoDto.getRoomId());
            log.info("Received playInfo message: {}", playInfoDto.toString());

            messagingTemplate.convertAndSend("/sub/playInfos/" + playInfoDto.getRoomId(), playInfoDto);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
