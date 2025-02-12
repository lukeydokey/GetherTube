package com.toy.gethertube.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto implements Serializable {
    private String roomId;
    private String nickName;
    private String chat;
}
