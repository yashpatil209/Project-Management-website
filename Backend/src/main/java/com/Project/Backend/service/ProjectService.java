package com.Project.Backend.service;

import com.Project.Backend.model.Project;
import com.Project.Backend.model.UserCred;
import com.Project.Backend.repository.ProjectRepository;
import com.Project.Backend.repository.UserCredRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserCredRepository userCredRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public String addProject(Project project, String ownerId) {
        project.setOwner(ownerId);

        String projectId = projectRepository.save(project).getProjectId();

        List<String> teamMembersEmails = project.getTeamMembers();

        Optional<UserCred> optionalOwner = userCredRepository.findById(ownerId);
        optionalOwner.ifPresent(user -> {
            if (user.getMyProjects() == null) {
                user.setMyProjects(new ArrayList<>());
            }
            user.getMyProjects().add(projectId);
            userCredRepository.save(user);
        });

        List<UserCred> teamMembers = userCredRepository.findByEmailIn(teamMembersEmails);

        for (UserCred user : teamMembers) {
            if (user.getProjects() == null) {
                user.setProjects(new ArrayList<>());
            }
            user.getProjects().add(projectId);
            userCredRepository.save(user);
        }

        return projectId;
    }


    public List<String> getAllMembers() {
        return userCredRepository.findAllEmail();
    }


    public List<String> getProjectAllMembers(String Id) {
        Project project = projectRepository.findById(Id).orElse(null);
        assert project != null;
        return project.getTeamMembers();
    }

    public List<Project> findProjectsByUserId(Long userId) {
        String jpql = "SELECT p FROM Project p WHERE p.ProjectId IN " +
                "(SELECT t.projectId FROM TeamMembers t WHERE t.userId = :userId)";

        return entityManager.createQuery(jpql, Project.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    public List<Project> getAllProjects(String userId) {
        Optional<UserCred> user = userCredRepository.findById(userId);

        if (user.isPresent()) {
            List<String> projectIds = user.get().getMyProjects();
            return projectRepository.findByProjectIdIn(projectIds);
        }

        return null;
    }

    public List<Project> getAllWorkProjects(String userId) {
        Optional<UserCred> user = userCredRepository.findById(userId);

        if (user.isPresent()) {
            List<String> projectIds = user.get().getProjects();
            return projectRepository.findByProjectIdIn(projectIds);
        }

        return null;
    }
}
