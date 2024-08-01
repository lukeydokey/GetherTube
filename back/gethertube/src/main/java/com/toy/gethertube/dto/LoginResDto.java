package com.toy.gethertube.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResDto {
    private String userId;
    private String nickName;
    private String accessToken;
//    private String refreshToken;
}
