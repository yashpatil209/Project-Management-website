package com.Project.Backend.service;

import com.Project.Backend.model.Submission;
import com.Project.Backend.model.Task;
import com.Project.Backend.repository.SubmissionRepository;
import com.Project.Backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public List<Submission> getSubmissionsByTaskId(String taskId) {
        return submissionRepository.findByTaskId(taskId);
    }

    public void createSubmission(MultipartFile file, String title, String description, String taskId) throws IOException {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Submission submission = new Submission();
        submission.setTaskId(taskId);
        submission.setTitle(title);
        submission.setDescription(description);
        submission.setFileName(file.getOriginalFilename());
        submission.setContent(file.getBytes());
        submission.setType(file.getContentType());
        Submission savedSubmission = submissionRepository.save(submission);

        if (task.getSubmission() == null) {
            task.setSubmission(new ArrayList<>());
        }
        task.getSubmission().add(savedSubmission.getId());

        taskRepository.save(task);
    }


    public void deleteSubmission(String id) {
        Task task = taskRepository.findBySubmissionContaining(id)
                .orElseThrow(() -> new RuntimeException("Task not found for this submission"));

        task.getSubmission().remove(id);
        taskRepository.save(task);

        submissionRepository.deleteById(id);
    }

}