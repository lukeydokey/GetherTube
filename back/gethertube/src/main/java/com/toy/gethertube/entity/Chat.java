package com.toy.gethertube.entity;

import com.toy.gethertube.dto.ChatDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "chat")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
    @Id
    private String _id;
    private String roomId;
    private ArrayList<String> chats;

    public ChatDto toDto(){
        return ChatDto.builder()
                ._id(this._id)
                .roomId(this.roomId)
                .chats(this.chats)
                .build();
    }
}
