package com.toy.gethertube.dto;

import com.toy.gethertube.entity.Chat;
import com.toy.gethertube.entity.Member;
import com.toy.gethertube.entity.PlayInfo;
import com.toy.gethertube.entity.Room;
import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomDto {
    private String _id;
    private String roomId;
    private String roomUrl;
    private ArrayList<Member> members;
    private ArrayList<String> playlists;
    private String playType = "queue";
    private Boolean isShuffled = false;
    private String replayType = "none";

    private PlayInfo playInfo;
    private Chat chat;

    public Room toEntity(){
        return Room.builder()
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
