package com.Project.Backend.repository;

import com.Project.Backend.model.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubmissionRepository extends MongoRepository<Submission, String> {

    List<Submission> findByTaskId(String taskId);
}
