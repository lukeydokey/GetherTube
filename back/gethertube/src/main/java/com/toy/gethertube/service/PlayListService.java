package com.toy.gethertube.service;

import com.toy.gethertube.dto.playlist.PlayListReqDto;
import com.toy.gethertube.dto.playlist.PlayListResDto;
import com.toy.gethertube.entity.PlayList;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.PlayListRepo;
import com.toy.gethertube.repository.UserRepo;
import com.toy.gethertube.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j(topic = "PlayListService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlayListService {
    private final UserRepo userRepository;
    private final PlayListRepo playListRepository;

    @Transactional
    public ResponseEntity<?> savePlaylist(String userId, PlayListReqDto requestDto) {
        PlayList playList = new PlayList();
        try {
            User user = userRepository.findOneByUserId(userId).orElse(null);
            playList = playListRepository.save(PlayList.builder()
                    .userId(userId)
                    .title(requestDto.getTitle())
                    .urls(requestDto.getUrls())
                    .build());
            List<PlayList> playlistIds;
            if(user.getUserPlaylists() == null){
                playlistIds = new ArrayList<>();
                playlistIds.add(playList);
            } else {
                playlistIds = user.getUserPlaylists();
                playlistIds.add(playList);
            }
            user.setUserPlaylists(playlistIds);
            userRepository.save(user);

        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseUtil.error("내부 서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
        return ResponseEntity.ok(ResponseUtil.success("플레이리스트 추가 성공", playList.toResDto()));
    }

    public ResponseEntity<?> getAllPlayLists(String userId) {
        try{
            User user = userRepository.findOneByUserId(userId).orElse(null);
            List<PlayListResDto> playlists = new ArrayList<>();
            for(PlayList playList : user.getUserPlaylists()){
                playlists.add(playList.toResDto());
            }
            return ResponseEntity.ok(ResponseUtil.success("플레이리스트 조회 성공", playlists));
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseUtil.error("내부 서버 오류입니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    @Transactional
    public ResponseEntity<?> deletePlaylist(String userId, String playlistId) {
        try {
            User user = userRepository.findOneByUserId(userId).orElseThrow(()->
                    new ResponseStatusException(HttpStatus.BAD_REQUEST)
            );
            PlayList playList = playListRepository.findById(playlistId).orElseThrow(()->
                    new ResponseStatusException(HttpStatus.BAD_REQUEST)
            );
            if(playList.getUserId() != user.getUserId()){
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            }
            playListRepository.deleteById(playlistId);
        }catch (ResponseStatusException e){
            if(e.getStatusCode() == HttpStatus.BAD_REQUEST){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(ResponseUtil.error("잘못된 요청입니다.", HttpStatus.BAD_REQUEST.value()));
            }else if(e.getStatusCode() == HttpStatus.UNAUTHORIZED){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(ResponseUtil.error("권한이 없습니다", HttpStatus.UNAUTHORIZED.value()));
            }
        }

        return ResponseEntity.ok(ResponseUtil.success("플레이리스트 삭제 성공", "Success"));
    }
}
