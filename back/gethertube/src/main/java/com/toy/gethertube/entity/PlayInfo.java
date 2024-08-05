package com.toy.gethertube.entity;

import com.toy.gethertube.dto.playinfo.PlayInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "playinfo")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayInfo {
    @Id
    private String _id;
    private String roomId;
    private Long playTime;
    private Boolean isPlaying;

    public PlayInfoDto toDto(){
        return PlayInfoDto.builder()
                ._id(this._id)
                .roomId(this.roomId)
                .playTime(this.playTime)
                .isPlaying(this.isPlaying)
                .build();
    }
}
