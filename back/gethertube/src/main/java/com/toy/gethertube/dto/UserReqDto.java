package com.toy.gethertube.dto;

import com.toy.gethertube.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserReqDto {
    private String userId;
    private String password;
    private String nickName;
    private String chatColor;

    public User toEntity(){
        return User.builder()
                .userId(this.userId)
                .password(this.password)
                .nickName(this.nickName)
                .chatColor(this.chatColor)
                .build();
    }
}
