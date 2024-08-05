package com.toy.gethertube.dto.playlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlayListReqDto {
    private ArrayList<String> urls;
}
