package com.toy.gethertube.controller;

import com.toy.gethertube.dto.playinfo.PlayInfoDto;
import com.toy.gethertube.service.PlayInfoPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
public class PlayInfoController {

    private final PlayInfoPublisher playInfoPublisher;

    @MessageMapping("/playInfo/message")
    public void updatePlayInfo(@RequestBody PlayInfoDto playInfoDto) {
        playInfoPublisher.publish("playInfo:room:" + playInfoDto.getRoomId(), playInfoDto);
    }
}
