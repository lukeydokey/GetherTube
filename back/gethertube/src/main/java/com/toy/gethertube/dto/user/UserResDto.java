package com.toy.gethertube.dto.user;

import com.toy.gethertube.dto.playlist.PlayListResDto;
import com.toy.gethertube.dto.room.RoomResDto;
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
    private List<RoomResDto> userRooms;
}
