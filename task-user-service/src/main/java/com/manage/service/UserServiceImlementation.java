package com.manage.service;

import com.manage.config.JwtProvider;
import com.manage.modal.User;
import com.manage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImlementation implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserProfile(String jwt) {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        return userRepository.findByEmail(email);
    }
}
