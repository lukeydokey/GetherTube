package com.toy.gethertube.dto.room;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomPlaylistUpdateReqDto {
    private List<String> newPlaylist;
}
