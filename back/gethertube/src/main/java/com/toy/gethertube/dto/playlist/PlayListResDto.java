package com.toy.gethertube.dto.playlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlayListResDto {
    private String _id;
    private String title;
    private ArrayList<String> urls;
}
