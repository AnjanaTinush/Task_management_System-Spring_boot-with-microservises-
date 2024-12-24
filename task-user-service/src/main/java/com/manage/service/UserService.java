package com.manage.service;

import com.manage.modal.User;

public interface UserService {

    public User getUserProfile(String jwt);

}
