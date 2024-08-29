package com.toy.gethertube.service;

import com.toy.gethertube.dto.playinfo.PlayInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "PlayInfoSubscriber")
public class PlayInfoSubscriber {

    private final SimpMessagingTemplate messagingTemplate;

    public void handlePlayInfo(PlayInfoDto playInfoDto) {
        messagingTemplate.convertAndSend("/sub/playInfo/" + playInfoDto.getRoomId(), playInfoDto);
    }
}
