package com.toy.gethertube.entity;

import com.toy.gethertube.dto.user.UserResDto;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

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
    private String password;
    @Indexed(unique = true)
    private String nickName;
    private String chatColor;

    @Field("userPlaylists")
    @DocumentReference(collection = "playlist", lazy = true)
    private List<PlayList> userPlaylists = new ArrayList<>();

    @Field("userRooms")
    @DocumentReference(collection = "room", lazy = true)
    private List<Room> userRooms = new ArrayList<>();

    public UserResDto toUserResDto() {
        return UserResDto.builder()
                ._id(this._id)
                .userId(this.userId)
                .nickName(this.nickName)
                .chatColor(this.chatColor)
                .userPlaylists(this.userPlaylists != null ? this.userPlaylists.stream().map(PlayList::toResDto).toList() : new ArrayList<>())
                .userRooms(this.userRooms != null ? this.userRooms.stream().map(Room::toDto).toList() : new ArrayList<>())
                .build();
    }

    @Override
    public String getId() {
        return this._id;
    }
}
