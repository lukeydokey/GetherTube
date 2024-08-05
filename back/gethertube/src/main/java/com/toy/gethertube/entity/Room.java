package com.toy.gethertube.entity;

import com.toy.gethertube.dto.room.RoomDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "room")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    private String _id;
    private String roomId;
    private String roomUrl;
    private ArrayList<Member> members;
    private ArrayList<String> playlists;
    private String playType;
    private Boolean isShuffled;
    private String replayType;

    @DBRef(lazy = true)
    private PlayInfo playInfo;
    @DBRef(lazy = true)
    private Chat chat;

    public RoomDto toDto(){
        return RoomDto.builder()
                ._id(this._id)
                .roomId(this.roomId)
                .roomUrl(this.roomUrl)
                .members(this.members)
                .playlists(this.playlists)
                .playType(this.playType)
                .isShuffled(this.isShuffled)
                .replayType(this.replayType)
                .playInfo(this.playInfo)
                .chat(this.chat)
                .build();
    }

}
