package com.toy.gethertube.entity;

import com.toy.gethertube.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "user")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String _id;
    private String userId;
    private String passWord;
    private String nickName;
    private String chatColor;
    private String userPlaylists;
    private String userRooms;

    public UserDto toUserDto() {
        return UserDto.builder()
                ._id(this._id)
                .userId(this.userId)
                .passWord(this.passWord)
                .nickName(this.nickName)
                .chatColor(this.chatColor)
                .build();
    }

}
