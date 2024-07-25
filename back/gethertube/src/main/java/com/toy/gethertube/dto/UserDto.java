package com.toy.gethertube.dto;

import com.toy.gethertube.entity.PlayList;
import com.toy.gethertube.entity.Room;
import com.toy.gethertube.entity.User;
import lombok.*;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

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
//    private ArrayList<PlayList> userPlayLists;
    private List<String> userPlaylistsId;
//    private ArrayList<Room> userRooms;
    private List<String> userRoomsId;

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
