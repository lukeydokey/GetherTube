package com.toy.gethertube.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResDto {
    private String _id;
    private String userId;
    private String nickName;
    private String chatColor;
    private List<PlayListResDto> userPlaylists;
    private List<RoomDto> userRooms;
}
