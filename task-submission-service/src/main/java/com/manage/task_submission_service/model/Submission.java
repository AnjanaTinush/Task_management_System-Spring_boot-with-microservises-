package com.manage.task_submission_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private Long taskId;
    private String githunLink;
    private Long userId;
    private String status="PENDING";
    private LocalDateTime submissionTime;

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setGithubLink(String githubLink) {
        this.githunLink = githubLink;
    }

    public String getGithubLink() {
        return githunLink;
    }

    public void setSubmitionTime(LocalDateTime submitionTime) {
        this.submissionTime = submitionTime;
    }

    public LocalDateTime getSubmitionTime() {
        return submissionTime;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
