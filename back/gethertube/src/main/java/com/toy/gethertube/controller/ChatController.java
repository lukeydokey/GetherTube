package com.toy.gethertube.controller;

import com.toy.gethertube.dto.chat.ChatDto;
import com.toy.gethertube.service.ChatPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatPublisher chatPublisher;

    @MessageMapping("/message")
    public void sendMessage(@RequestBody ChatDto chatDto){
        chatPublisher.publish("chat:room:" + chatDto.getRoomId(), chatDto);
    }
}
