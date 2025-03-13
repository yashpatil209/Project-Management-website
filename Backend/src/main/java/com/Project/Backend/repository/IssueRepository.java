package com.Project.Backend.repository;

import com.Project.Backend.model.Issue;
import com.Project.Backend.model.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IssueRepository extends MongoRepository<Issue , String> {
    List<Issue> findByTaskId(String taskId);


}
