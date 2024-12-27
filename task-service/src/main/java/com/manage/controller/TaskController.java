package com.manage.controller;

import com.manage.model.Task;
import com.manage.model.TaskStatus;
import com.manage.model.UserDto;
import com.manage.service.TaskService;
import com.manage.service.UserServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserServise userServise;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto user;
        try {
            user = userServise.getUserProfile(jwt);
        } catch (Exception e) {
            throw new Exception("Failed to fetch user profile. Check User Service availability.");
        }

        if (user == null || user.getRole() == null) {
            throw new Exception("Invalid user profile or role.");
        }

        Task createdTask = taskService.createTask(task, user.getRole());
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Task>getTaskById(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto user = userServise.getUserProfile(jwt);

        Task task = taskService.getTaskById(id);

        return  new ResponseEntity<>(task, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Task>>getAssignedUsersTask(@RequestParam(required = false)TaskStatus status, @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto user = userServise.getUserProfile(jwt);

        List<Task> tasks = taskService.assignedUsersTask(user.getId(),status);

        return  new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Task>>getAllTask(@RequestParam(required = false)TaskStatus status, @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto user = userServise.getUserProfile(jwt);

        List<Task> tasks = taskService.getAllTask(status);

        return  new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping("/{id}/user/{userid}/assigned")
    public ResponseEntity<Task>assignedTaskToUser(@PathVariable Long id,@PathVariable Long userid, @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto user = userServise.getUserProfile(jwt);

        Task tasks = taskService.assignedToUser(userid,id);

        return  new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task>updateTask(@PathVariable Long id,@RequestBody Task req, @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto user = userServise.getUserProfile(jwt);

        Task tasks = taskService.updateTask(id,req, user.getId());

        return  new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Task>completeTask(@PathVariable Long id) throws Exception {

        Task tasks = taskService.completeTask(id);

        return  new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>deleteTask(@PathVariable Long id) throws Exception {

        taskService.deleteTask(id);

        return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

