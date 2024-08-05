package com.toy.gethertube.dto.playlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlayListResDto {
    private String _id;
    private ArrayList<String> urls;
}
