package com.toy.gethertube.service;

import com.toy.gethertube.dto.chat.ChatDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "ChatSubscriber")
public class ChatSubscriber {

    private final SimpMessagingTemplate messagingTemplate;

    public void handleMessage(ChatDto chatDto) {
        messagingTemplate.convertAndSend("/sub/chat/" + chatDto.getRoomId(), chatDto.getChat());
    }
}
