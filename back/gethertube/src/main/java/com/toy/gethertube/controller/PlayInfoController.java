package com.toy.gethertube.controller;

import com.toy.gethertube.dto.playinfo.PlayInfoDto;
import com.toy.gethertube.service.PlayInfoPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/playInfo")
@RequiredArgsConstructor
public class PlayInfoController {

    private final PlayInfoPublisher playInfoPublisher;

    @MessageMapping("/message")
    public void updatePlayInfo(@RequestBody PlayInfoDto playInfoDto) {
        playInfoPublisher.publish("playInfo:room:" + playInfoDto.getRoomId(), playInfoDto);
    }
}
