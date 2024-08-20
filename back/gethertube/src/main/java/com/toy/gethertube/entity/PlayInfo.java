package com.toy.gethertube.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "playinfo")
public class PlayInfo extends Auditable{
    @Id
    private String _id;
    private String roomId;
    private Long playTime;
    private Boolean isPlaying;

    @Override
    public String getId() {
        return this._id;
    }
}
