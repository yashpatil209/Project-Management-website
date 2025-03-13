package com.Project.Backend.service;

import com.Project.Backend.model.Issue;
import com.Project.Backend.model.Submission;
import com.Project.Backend.model.Task;
import com.Project.Backend.repository.IssueRepository;
import com.Project.Backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private TaskRepository taskRepository;

    public void createIssue(MultipartFile file, String title, String description, String taskId) throws IOException {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Issue issue = new Issue();
        issue.setTaskId(taskId);
        issue.setTitle(title);
        issue.setDescription(description);

        if (file != null && !file.isEmpty()) {
            issue.setFileName(file.getOriginalFilename());
            issue.setContent(file.getBytes());
            issue.setType(file.getContentType());
        }

        Issue savedIssue = issueRepository.save(issue);

        if (task.getIssue() == null) {
            task.setIssue(new ArrayList<>());
        }
        task.getIssue().add(savedIssue.getId());

        taskRepository.save(task);
    }


    public List<Issue> getIssuesByTaskId(String taskId) {
        return issueRepository.findByTaskId(taskId);
    }

    public void resolveIssue(String id) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        issue.setResolved(true); // Ensure the Issue model has a 'resolved' field
        issueRepository.save(issue);
    }

    public void deleteIssue(String id) {
        Task task = taskRepository.findByIssueContaining(id)
                .orElseThrow(() -> new RuntimeException("Task not found for this issue"));

        task.getIssue().remove(id);
        taskRepository.save(task);

        issueRepository.deleteById(id);
    }

}
