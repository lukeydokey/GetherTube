package com.toy.gethertube.dto;

import com.toy.gethertube.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String _id;
    private String userId;
    private String passWord;
    private String nickName;
    private String chatColor;
    //    private ArrayList<Playlist> userPlaylists;
    //    private ArrayList<Room> userRooms;

    public User toEntity(){
        return User.builder()
                ._id(this._id)
                .userId(this.userId)
                .passWord(this.passWord)
                .nickName(this.nickName)
                .chatColor(this.chatColor)
                .build();
    }
}
