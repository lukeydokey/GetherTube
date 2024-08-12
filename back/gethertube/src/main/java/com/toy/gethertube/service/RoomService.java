package com.toy.gethertube.service;

import com.toy.gethertube.entity.Room;
import com.toy.gethertube.entity.RoomMember;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.RoomRepo;
import com.toy.gethertube.repository.UserRepo;
import com.toy.gethertube.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j(topic = "Room Service")
public class RoomService {

    private static final int ROOM_ID_LENGTH = 8;

    private final RoomRepo roomRepository;
    private final UserRepo userRepository;

    @Transactional
    public ResponseEntity<?> createRoom(String userId) {
        String roomId = createRandomId();
        while(roomRepository.findByRoomId(roomId).isPresent()){ // 중복하지않는 랜덤 룸 아이디 생성
            roomId = createRandomId();
        }
        Room room = Room.builder()
                .roomId(roomId)
                .roomMembers(new ArrayList<>())
                .urls(new ArrayList<>())
                .playType("Queue")
                .isShuffled(false)
                .replayType("No")
                .build();
        try {
            User user = userRepository.findOneByUserId(userId).orElseThrow();
            room.addMember(new RoomMember(userId, user.getNickName(), "Owner"));
            room = roomRepository.save(room);

            List<Room> roomIds;
            if(user.getUserRooms() == null){
                roomIds = new ArrayList<>();
                roomIds.add(room);
            } else {
                roomIds = user.getUserRooms();
                roomIds.add(room);
            }
            user.setUserRooms(roomIds);
            userRepository.save(user);

        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseUtil.error("내부 서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
        return ResponseEntity.ok(ResponseUtil.success("룸 생성 성공", room.toResDto()));
    }

    private String createRandomId() {
        StringBuilder id = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < ROOM_ID_LENGTH; i++) {
            int num = random.nextInt(52);
            if( num < 26) { // 0 ~ 25 소문자
                id.append((char)('a' + num));
            }else { // 26 ~ 51 대문자
                id.append((char)('A' + num - 26));
            }
        }
        return id.toString();
    }


}
