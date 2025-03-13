package com.Project.Backend.controller;

import com.Project.Backend.model.Submission;
import com.Project.Backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @PostMapping("/{id}")
    public ResponseEntity<?> createSubmission(@RequestPart("file") MultipartFile file,
                                              @RequestPart("title") String title,
            @RequestPart("description") String description
            , @PathVariable String id) {
        try{
            submissionService.createSubmission(file, title, description, id);
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/task/{taskId}")
    public List<Submission> getSubmissionsByTaskId(@PathVariable String taskId) {
        return submissionService.getSubmissionsByTaskId(taskId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubmission(@PathVariable String id) {
        submissionService.deleteSubmission(id);
        return ResponseEntity.noContent().build();
    }
}
