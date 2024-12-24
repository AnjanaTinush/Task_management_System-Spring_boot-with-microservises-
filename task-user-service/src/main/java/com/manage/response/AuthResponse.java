package com.manage.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class AuthResponse {


    private String jwt;
    private String message;
    private Boolean status;

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
    public void setStatus(Boolean status) {
        this.status = Boolean.valueOf(status);
    }

    public Boolean getStatus() {
        return status;
    }
}
