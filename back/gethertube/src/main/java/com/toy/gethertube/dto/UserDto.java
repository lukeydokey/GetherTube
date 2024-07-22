package com.toy.gethertube.dto;

import com.toy.gethertube.entity.PlayList;
import com.toy.gethertube.entity.Room;
import com.toy.gethertube.entity.User;
import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String _id;
    private String userId;
    private String passWord;
    private String nickName;
    private String chatColor;
    private ArrayList<PlayList> userPlayLists;
    private ArrayList<Room> userRooms;

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
