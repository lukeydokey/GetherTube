package com.toy.gethertube.util;

import com.toy.gethertube.dto.user.LoginDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

@Slf4j(topic = "JWT 처리 로직")
@Component
public class JwtUtil {

    private final Key key;
    private final long accessTokenValidity;
    //private final long refreshTokenValidity;

    public JwtUtil(
            @Value("${jwt.secret}") String secretKey,
            @Value("${jwt.expiration}") final long accessTokenValidity) { // 유효기간 1시간
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        key = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenValidity = accessTokenValidity;
    }

    public String createAccessToken(LoginDto userInfo) {
        return createToken(userInfo, accessTokenValidity);
    }

    private String createToken(LoginDto userInfo, long accessTokenValidity) {
        ClaimsBuilder claims = Jwts.claims();
        claims.add("userId", userInfo.getUserId());

        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime expiration = now.plusSeconds(accessTokenValidity);

        return Jwts.builder()
                .claims(claims.build())
                .issuedAt(Date.from(now.toInstant()))
                .expiration(Date.from(expiration.toInstant()))
                .signWith(key)
                .compact();

    }

    public boolean validateToken(String token) {
        try{
            Jwts.parser().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }
        return false;
    }


    public String getUserId(String token) {
        return parseClaims(token).get("userId", String.class);
    }

    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
