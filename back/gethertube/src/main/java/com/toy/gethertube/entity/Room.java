package com.toy.gethertube.entity;

import com.toy.gethertube.dto.room.RoomResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "room")
public class Room {
    @Id
    private String _id;
    private String roomId;
    private List<RoomMember> roomMembers;
    private List<String> urls;

    // Queue, List
    private String playType;
    // 셔플, 리플레이는 List 일때만 적용
    private Boolean isShuffled;
    // No, One, All
    private String replayType;

    @DocumentReference(collection = "playinfo", lazy = true)
    private PlayInfo playInfo;

    @Field("roomChat")
    @DocumentReference(collection = "chat", lazy = true)
    private Chat chat;

    public void addMember(RoomMember member){
        roomMembers.add(member);
    }

    public void updateMember(String userId, String authority){
        for(RoomMember member : roomMembers){
            if(member.getUserId().equals(userId)){
                member.setAuthority(authority);
                break;
            }
        }
    }

    public void deleteMember(RoomMember member){
        roomMembers.remove(member);
    }

    public RoomResDto toResDto(){
        return RoomResDto.builder()
                ._id(this._id)
                .roomId(this.roomId)
                .roomMembers(this.roomMembers)
                .urls(this.urls)
                .playType(this.playType)
                .isShuffled(this.isShuffled)
                .replayType(this.replayType)
                .playInfo(this.playInfo)
                .chat(this.chat)
                .build();
    }

}
