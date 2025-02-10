package com.toy.gethertube.service;

import com.toy.gethertube.dto.room.RoomMemberReqDto;
import com.toy.gethertube.entity.PlayInfo;
import com.toy.gethertube.entity.Room;
import com.toy.gethertube.entity.RoomMember;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.PlayInfoRepo;
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
    private final PlayInfoRepo playInfoRepository;

    @Transactional
    public ResponseEntity<?> createRoom(String userId) {
        String roomId = createRandomId();
        while(roomRepository.findByRoomId(roomId).isPresent()){ // 중복하지않는 랜덤 룸 아이디 생성
            roomId = createRandomId();
        }
        PlayInfo playInfo = playInfoRepository.save(
                PlayInfo.builder()
                        .roomId(roomId)
                        .playTime(0L)
                        .isPlaying(false)
                        .build()
        );

        Room room = Room.builder()
                .roomId(roomId)
                .roomMembers(new ArrayList<>())
                .urls(new ArrayList<>())
                .playInfo(playInfo)
                .playType("Queue")
                .isShuffled(false)
                .replayType("No")
                .build();
        try {
            addMember(room, userId, "Owner");
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseUtil.error("내부 서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
        return ResponseEntity.ok(ResponseUtil.success("룸 생성 성공", room.toResDto()));
    }

    public ResponseEntity<?> getRoom(String roomId){
        Room room;
        try {
            room = roomRepository.findByRoomId(roomId).orElseThrow();
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ResponseUtil.error("룸 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()));
        }

        return ResponseEntity.ok(ResponseUtil.success("룸 정보 조회 성공", room.toResDto()));
    }

    @Transactional
    public ResponseEntity<?> deleteRoom(String userId, String roomId){
        try{
            Room room = roomRepository.findByRoomId(roomId).orElseThrow();

            if(!isOwner(room, userId)){
                log.error("접근할 수 없는 요청입니다.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(ResponseUtil.error("접근할 수 없는 요청입니다.", HttpStatus.FORBIDDEN.value()));
            }
            List<User> users = new ArrayList<>();
            for(RoomMember roomMember : room.getRoomMembers()){
                users.add(userRepository.findOneByUserId(userId).orElseThrow());
            }
            playInfoRepository.deleteById(room.getPlayInfo().get_id());
            roomRepository.delete(room);
            for(User user : users){
                List<Room> rooms = user.getUserRooms();
                rooms.remove(room);
                userRepository.save(user);
            }
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseUtil.error("내부 서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
        return ResponseEntity.ok(ResponseUtil.success("룸 삭제 성공", "룸 " + roomId + " 삭제 완료"));
    }

    @Transactional
    public ResponseEntity<?> addRoomMember(String roomId, String userId){
        Room room;
        try {
            room = roomRepository.findByRoomId(roomId).orElseThrow();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ResponseUtil.error("룸 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()));
        }
        try {
            if(!room.checkMember(userId)) // 중복 추가 방지
                addMember(room, userId, "Member");
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseUtil.error("내부 서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
        return ResponseEntity.ok(ResponseUtil.success("룸 멤버 추가 성공", room.toResDto()));
    }

    @Transactional
    public ResponseEntity<?> updateRoomMember(String roomId, String userId, RoomMemberReqDto memberReqDto){
        Room room;
        try{
            room = roomRepository.findByRoomId(roomId).orElseThrow();

            if(!isOwner(room, userId)){
                log.error("접근할 수 없는 요청입니다.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(ResponseUtil.error("접근할 수 없는 요청입니다.", HttpStatus.FORBIDDEN.value()));
            }

        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ResponseUtil.error("룸 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()));
        }

        try {
            room.updateMember(memberReqDto.getUserId(), memberReqDto.getAuthority());
            roomRepository.save(room);
        } catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ResponseUtil.error("룸 멤버 업데이트 실패", HttpStatus.BAD_REQUEST.value()));
        }
        return ResponseEntity.ok(ResponseUtil.success("룸 멤버 업데이트 성공", room.toResDto()));
    }

    @Transactional
    public ResponseEntity<?> deleteRoomMember(String roomId, String userId, String memberId){
        Room room;
        try {
            room = roomRepository.findByRoomId(roomId).orElseThrow();

            if(!isOwner(room, userId)){
                log.error("접근할 수 없는 요청입니다.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(ResponseUtil.error("접근할 수 없는 요청입니다.", HttpStatus.FORBIDDEN.value()));
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ResponseUtil.error("룸 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()));
        }
        try {
            User user = userRepository.findOneByUserId(memberId).orElseThrow();
            room.deleteMember(user.getUserId());
            room = roomRepository.save(room);

            List<Room> rooms = user.getUserRooms();
            rooms.remove(room);
            user.setUserRooms(rooms);
            userRepository.save(user);
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseUtil.error("내부 서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
        return ResponseEntity.ok(ResponseUtil.success("룸 멤버 삭제 성공", room.toResDto()));
    }



    public ResponseEntity<?> checkRoomMember(String roomId, String userId) {
        User user;
        try {
            user = userRepository.findOneByUserId(userId).orElseThrow();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ResponseUtil.error("유저 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()));
        }

        Room room;
        try {
            room = roomRepository.findByRoomId(roomId).orElseThrow();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ResponseUtil.error("룸 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()));
        }

        if(room.checkMember(userId)) { // 유저가 멤버로 존재하는 경우
            return ResponseEntity.ok(ResponseUtil.success("유저가 멤버로 존재합니다.", true));
        } else {
            return ResponseEntity.ok(ResponseUtil.success("유저가 멤버로 존재하지 않습니다.", false));
        }
    }

    // Room Member 추가하는 메서드
    private void addMember(Room room, String userId, String authority){
        User user = userRepository.findOneByUserId(userId).orElseThrow();
        room.addMember(new RoomMember(userId, user.getNickName(), authority));
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
    }

    //Owner 권한 확인하는 메서드
    private boolean isOwner(Room room, String userId){
        List<RoomMember> roomMembers = room.getRoomMembers();
        String authority = "";
        for(RoomMember roomMember : roomMembers){
            if(roomMember.getUserId().equals(userId)){
                authority = roomMember.getAuthority();
                break;
            }
        }

        return authority.equals("Owner");
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
