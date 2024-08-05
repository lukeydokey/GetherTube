package com.toy.gethertube.dto.playlist;

import com.toy.gethertube.entity.PlayList;
import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlayListDto {
    private String _id;
    private String userId;
    private ArrayList<String> urls;

    public PlayList toEntity(){
        return PlayList.builder()
                ._id(this._id)
                .userId(this.userId)
                .urls(this.urls)
                .build();
    }
}
