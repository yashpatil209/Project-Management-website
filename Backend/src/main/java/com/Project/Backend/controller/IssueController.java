package com.Project.Backend.controller;

import com.Project.Backend.model.Issue;
import com.Project.Backend.model.Submission;
import com.Project.Backend.model.Task;
import com.Project.Backend.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/issue")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping("/{id}")
    public ResponseEntity<?> createSubmission(
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @PathVariable String id) {
        try {
            issueService.createIssue(file, title, description, id);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{taskId}")
    public List<Issue> getIssueByTaskId(@PathVariable String taskId) {
        return issueService.getIssuesByTaskId(taskId);
    }

    @PutMapping("/resolve/{Id}")
    public ResponseEntity<?> resolveIssue(@PathVariable String Id){
        issueService.resolveIssue(Id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<?> deleteIssue(@PathVariable String Id){
        issueService.deleteIssue(Id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}