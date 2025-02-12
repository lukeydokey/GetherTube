package com.toy.gethertube.dto.playinfo;

import com.toy.gethertube.entity.PlayInfo;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlayInfoDto implements Serializable {
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
