package com.toy.gethertube.dto.room;

import com.toy.gethertube.entity.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomResDto {
    private String _id;
    private String roomId;
    private List<RoomMember> roomMembers;
    private List<String> urls;
    private String playType;
    private Boolean isShuffled;
    private String replayType;

    private PlayInfo playInfo;
    private Chat chat;
}
