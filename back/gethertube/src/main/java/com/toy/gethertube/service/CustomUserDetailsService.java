package com.toy.gethertube.service;


import com.toy.gethertube.dto.CustomUserDetails;
import com.toy.gethertube.entity.User;
import com.toy.gethertube.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepo.findOneByUserId(userId)
                .orElseThrow(() -> new UsernameNotFoundException(userId + " 등록된 사용자가 없습니다. "));

        return new CustomUserDetails(user);
    }

}
