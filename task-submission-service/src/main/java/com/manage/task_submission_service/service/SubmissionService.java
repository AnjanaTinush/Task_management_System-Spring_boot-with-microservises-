package com.manage.task_submission_service.service;

import com.manage.task_submission_service.model.Submission;

import java.util.List;

public interface SubmissionService {

    Submission submitTask(Long taskId,String githubLink,Long userId, String jwt) throws Exception;

    Submission getTaskSubmitionBiId(Long submitionIdd) throws Exception;

    List<Submission> getAllSubmition();

    List<Submission> getTaskSubmitionByTaskId(Long taskId);

    Submission acceptDeclineSubmition(Long id,String status) throws  Exception;

}
