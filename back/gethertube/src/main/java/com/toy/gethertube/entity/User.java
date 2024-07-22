package com.toy.gethertube.entity;

import com.toy.gethertube.dto.UserDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "user")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String _id;
    @Indexed(unique = true)
    private String userId;
    private String passWord;
    @Indexed(unique = true)
    private String nickName;
    private String chatColor;

    @DBRef(db = "playlist", lazy = true)
    private ArrayList<PlayList> userPlayLists;
    @DBRef(db = "room", lazy = true)
    private ArrayList<Room> userRooms;

    public UserDto toUserDto() {
        return UserDto.builder()
                ._id(this._id)
                .userId(this.userId)
                .passWord(this.passWord)
                .nickName(this.nickName)
                .chatColor(this.chatColor)
                .userPlayLists(this.userPlayLists)
                .userRooms(this.userRooms)
                .build();
    }

}
