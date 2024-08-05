package com.toy.gethertube.dto.chat;

import com.toy.gethertube.entity.Chat;
import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatDto {
    private String _id;
    private String roomId;
    private ArrayList<String> chats;

    public Chat toEntity(){
        return Chat.builder()
                ._id(this._id)
                .roomId(this.roomId)
                .chats(this.chats)
                .build();
    }
}
