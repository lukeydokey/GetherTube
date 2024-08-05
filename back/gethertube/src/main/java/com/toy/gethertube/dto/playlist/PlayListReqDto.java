package com.toy.gethertube.dto.playlist;

import com.toy.gethertube.entity.PlayList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlayListReqDto {
    private String title;
    private ArrayList<String> urls;
}
