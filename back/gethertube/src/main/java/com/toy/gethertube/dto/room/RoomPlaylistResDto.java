package com.toy.gethertube.dto.room;


import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomPlaylistResDto {
    private List<String> roomPlaylist;
}
