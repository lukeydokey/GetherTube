package com.toy.gethertube.dto;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class ErrorResponseDto {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    public ErrorResponseDto(int value, String message, LocalDateTime now) {
        status = value;
        this.message = message;
        this.timestamp = now;
    }
}
