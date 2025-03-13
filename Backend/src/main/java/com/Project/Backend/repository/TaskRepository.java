package com.Project.Backend.repository;

import com.Project.Backend.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findAllByProjectIdAndStatus(String projectId, String status);

    Optional<Task> findByIssueContaining(String issueId);

    Optional<Task> findBySubmissionContaining(String submissionId);

    List<Task> findByProjectIdAndIdIn(String projectId, List<String> ids);

}
