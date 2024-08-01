package com.toy.gethertube.entity;

import com.toy.gethertube.dto.PlayListDto;
import com.toy.gethertube.dto.UserDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Document(collection = "user")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User extends Auditable{
    @Id
    private String _id;
    @Indexed(unique = true)
    private String userId;
    private String passWord;
    @Indexed(unique = true)
    private String nickName;
    private String chatColor;

//    @DBRef(db = "playlist", lazy = true)
//    private ArrayList<PlayList> userPlayLists;
    @Field("userPlaylists")
    @DocumentReference(collection = "playlist", lazy = true)
    private List<PlayList> userPlaylists = new ArrayList<>();
//    @DBRef(db = "room", lazy = true)
//    private ArrayList<Room> userRooms;
    @Field("userRooms")
    @DocumentReference(collection = "room", lazy = true)
    private List<Room> userRooms = new ArrayList<>();

    public UserDto toUserDto() {
        return UserDto.builder()
                ._id(this._id)
                .userId(this.userId)
                .passWord(this.passWord)
                .nickName(this.nickName)
                .chatColor(this.chatColor)
//                .userPlayLists(this.userPlayLists)
//                .userRooms(this.userRooms)
                .userPlaylists(this.userPlaylists != null ? this.userPlaylists.stream().map(PlayList::toResDto).toList() : new ArrayList<>())
                .userRooms(this.userRooms != null ? this.userRooms.stream().map(Room::toDto).toList() : new ArrayList<>())
                .build();
    }

    @Override
    public String getId() {
        return this._id;
    }
}
