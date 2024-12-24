package com.manage.controller;

import com.manage.config.JwtProvider;
import com.manage.modal.User;
import com.manage.repository.UserRepository;
import com.manage.request.LoginRequest;
import com.manage.response.AuthResponse;
import com.manage.service.CustomerUserServiceImplementation;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomerUserServiceImplementation customerUserDetails;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user) throws Exception{

        String email = user.getEmail();
        String password = user.getPassword();
        String fullName = user.getFullName();
        String role = user.getRole();

        User isEmailExist = userRepository.findByEmail(email);

        if(isEmailExist!=null){
            throw  new Exception("Email Is Already Used With Another Account!");
        }

        User createUser = new User();

        createUser.setEmail(email);
        createUser.setFullName(fullName);
        createUser.setRole(role);
        createUser.setPassword(passwordEncoder.encode(password));

        User saveUser = userRepository.save(createUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.genarateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Registration Successfully!");
        authResponse.setStatus(true);

        return  new ResponseEntity<>(authResponse, HttpStatus.OK);

    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest){

        String userName = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        System.out.println(userName +"------"+ password);

        Authentication authentication = authenticate(userName , password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.genarateToken(authentication);
        AuthResponse authResponse = new AuthResponse();

        authResponse.setMessage("Login successfully!");
        authResponse.setJwt(token);
        authResponse.setStatus(true);

        return new ResponseEntity<>(authResponse,HttpStatus.OK);
    }

    private Authentication authenticate(String userName, String password) {

        UserDetails userDetails = customerUserDetails.loadUserByUsername(userName);

        System.out.println("Sign in userDetails -" + userDetails);

        if(userDetails == null){
            System.out.println("Sign in userDetails - null" + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            System.out.println("Sign in userDetails - Passowrd not Match"+userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }

        return  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }

}
