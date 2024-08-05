package com.toy.gethertube.controller;

import com.toy.gethertube.dto.playlist.PlayListReqDto;
import com.toy.gethertube.service.PlayListService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlist")
@Tag(name = "PlayList", description = "PlayList API")
@Slf4j
@RequiredArgsConstructor
public class PlayListController {

    private final PlayListService playListService;

    @PostMapping
    public ResponseEntity<?> savePlayList(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PlayListReqDto playListDto){
        return playListService.savePlaylist(userDetails.getUsername(), playListDto);
    }

    @GetMapping
    public ResponseEntity<?> getAllPlayList(@AuthenticationPrincipal UserDetails userDetails) {
        return playListService.getAllPlayLists(userDetails.getUsername());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePlayList(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String id) {
        return playListService.deletePlaylist(userDetails.getUsername(), id);
    }
}
