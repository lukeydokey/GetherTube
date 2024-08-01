package com.toy.gethertube.entity;

import com.toy.gethertube.dto.PlayListDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "playlist")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayList extends Auditable{
    @Id
    private String _id;
    private String userId;
    private ArrayList<String> urls;

    public PlayListDto toDto(){
        return PlayListDto.builder()
                ._id(this._id)
                .userId(this.userId)
                .urls(this.urls)
                .build();
    }

    @Override
    public String getId() {
        return this._id;
    }
}
