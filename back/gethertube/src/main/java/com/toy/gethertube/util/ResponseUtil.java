package com.toy.gethertube.util;

import com.toy.gethertube.dto.Response;

import java.time.LocalDateTime;

public class ResponseUtil {

    public static <T> Response<T> success(String message, T data) {
        return new Response<>(200,message,data, LocalDateTime.now());
    }

    public static <T> Response<T> error(int status, String message) {
        return new Response<>(status,message, LocalDateTime.now());
    }

}
