package com.Project.Backend.repository;

import com.Project.Backend.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> { // Change ID type to String

    List<Project> findAllByStatus(String value);

    List<Project> findAllByPriority(String value);

    List<Project> findAllByOwner(String id); // Change Long to String

    // MongoDB Query to find projects where user is a team member
    @Query("{ 'teamMembers': ?0 }")
    List<Project> findProjectsByUserId(String userId);

    List<Project> findByProjectIdIn(List<String> projectIds);

}
