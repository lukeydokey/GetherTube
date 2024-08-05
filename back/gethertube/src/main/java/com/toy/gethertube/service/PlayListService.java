package com.toy.gethertube.service;

import com.toy.gethertube.dto.playlist.PlayListDto;
import com.toy.gethertube.dto.playlist.PlayListReqDto;
import com.toy.gethertube.entity.PlayList;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.PlayListRepo;
import com.toy.gethertube.repository.UserRepo;
import com.toy.gethertube.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j(topic = "PlayListService")
@RequiredArgsConstructor
public class PlayListService {
    private final UserRepo userRepository;
    private final PlayListRepo playListRepository;

    public ResponseEntity<?> savePlaylist(String userId, PlayListReqDto playListDto) {
        User user = userRepository.findOneByUserId(userId).orElse(null);
        PlayList playList = playListRepository.save(PlayListDto.builder()
                .userId(userId)
                .urls(playListDto.getUrls())
                .build().toEntity());
        List<PlayList> playlistIds;
        if(user.getUserPlaylists() == null){
            playlistIds = new ArrayList<>();
            playlistIds.add(playList);
        } else {
            playlistIds = user.getUserPlaylists();
            playlistIds.add(playList);
        }
        user.setUserPlaylists(playlistIds);
        System.out.println(user);
        userRepository.save(user);
        return ResponseEntity.ok(ResponseUtil.success("플레이리스트 추가 성공", playList.toDto()));
    }

}
