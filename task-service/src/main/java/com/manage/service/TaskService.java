package com.manage.service;

import com.manage.model.Task;
import com.manage.model.TaskStatus;

import java.util.List;

public interface TaskService {

    Task createTask(Task task,String requestRole) throws  Exception;

    Task getTaskById(Long id)throws  Exception;

    List<Task> getAllTask(TaskStatus status)throws  Exception;

    Task updateTask(Long id,Task updatedTask,Long userId)throws  Exception;

    void deleteTask(Long id) throws Exception;

    Task assignedToUser(Long userID,Long taskId)throws  Exception;

    List<Task>assignedUsersTask(Long userId,TaskStatus status);

    Task completeTask(Long taskId)throws  Exception;





}
