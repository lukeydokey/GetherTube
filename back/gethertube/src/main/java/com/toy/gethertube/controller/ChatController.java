package com.toy.gethertube.controller;

import com.toy.gethertube.dto.chat.ChatDto;
import com.toy.gethertube.service.ChatPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatPublisher chatPublisher;

    @MessageMapping("/chat/message")
    public void sendMessage(@RequestBody ChatDto chatDto){
        chatPublisher.publish("/sub/chat/" + chatDto.getRoomId(), chatDto);
    }
}
