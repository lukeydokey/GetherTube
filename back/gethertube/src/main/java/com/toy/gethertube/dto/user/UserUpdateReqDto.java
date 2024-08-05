package com.toy.gethertube.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateReqDto {
//    private String password;
    private String nickName;
    private String chatColor;
}
