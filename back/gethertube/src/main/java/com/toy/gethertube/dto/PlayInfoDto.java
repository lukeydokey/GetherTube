package com.toy.gethertube.dto;

import com.toy.gethertube.entity.PlayInfo;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlayInfoDto {
    private String _id;
    private String roomId;
    private Long playTime;
    private Boolean isPlaying;

    public PlayInfo toEntity(){
        return PlayInfo.builder()
                ._id(this._id)
                .roomId(this.roomId)
                .playTime(this.playTime)
                .isPlaying(this.isPlaying)
                .build();
    }
}
