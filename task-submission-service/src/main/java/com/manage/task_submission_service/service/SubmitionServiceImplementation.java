package com.manage.task_submission_service.service;

import com.manage.task_submission_service.model.Submission;
import com.manage.task_submission_service.model.TaskDto;
import com.manage.task_submission_service.repository.SubmitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmitionServiceImplementation implements SubmissionService{

    @Autowired
    private SubmitionRepository submitionRepository;

    @Autowired
    private TaskService taskService;

    @Override
    public Submission submitTask(Long taskId, String githubLink, Long userId, String jwt) throws Exception {
        TaskDto task = taskService.getTaskById(taskId, jwt);
        if (task != null) {
            Submission submission = new Submission();
            submission.setTaskId(taskId);
            submission.setUserId(userId);
            submission.setGithubLink(githubLink);
            submission.setSubmitionTime(LocalDateTime.now());
            return submitionRepository.save(submission);
        }
        throw new Exception("Task not found with id :" + taskId);
    }


    @Override
    public Submission getTaskSubmitionBiId(Long submitionId) throws Exception {
        return submitionRepository.findById(submitionId).orElseThrow(()->
                new Exception("Task not found with id"+submitionId));
    }

    @Override
    public List<Submission> getAllSubmition() {
        return submitionRepository.findAll();
    }

    @Override
    public List<Submission> getTaskSubmitionByTaskId(Long taskId) {
        return submitionRepository.findByTaskId(taskId);
    }

    @Override
    public Submission acceptDeclineSubmition(Long id, String status) throws Exception {
           Submission submission = getTaskSubmitionBiId(id);
           submission.setStatus(status);
           if(status.equals("ACCEPT")){
               taskService.completeTask(submission.getTaskId());
           }
        return submitionRepository.save(submission);
    }
}
