package com.manage.task_submission_service.model;

import jakarta.persistence.ElementCollection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class TaskDto {

    private Long id;
    private String title;
    private String description;
    private String image;
    private Long assigneUserId;

    @ElementCollection
    private List<String> tags = new ArrayList<>();

    private TaskStatus status;
    private LocalDateTime deadline;
    private LocalDateTime createAt = LocalDateTime.now(); // Default value

}
