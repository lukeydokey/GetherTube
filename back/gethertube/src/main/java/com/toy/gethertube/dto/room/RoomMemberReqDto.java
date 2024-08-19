package com.toy.gethertube.dto.room;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomMemberReqDto {
    String userId;
    String authority;
}
