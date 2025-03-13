package com.Project.Backend.service;

import com.Project.Backend.model.*;
import com.Project.Backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserCredRepository userCredRepository;

    public void addNewTask(Task task, String projectId) {
        task.setProjectId(projectId);

        String taskId = taskRepository.save(task).getId();

        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            if (project.getTasks() == null) {
                project.setTasks(new ArrayList<>());  // Initialize if null
            }
            project.getTasks().add(taskId);
            projectRepository.save(project);
        }

        for (String email : task.getTeamMembers()) {
            UserCred user = userCredRepository.findByEmail(email);
            if (user != null) {
                if (user.getTasks() == null) {
                    user.setTasks(new ArrayList<>());  // Initialize if null
                }
                user.getTasks().add(taskId);
                userCredRepository.save(user);
            }
        }
    }

    public List<Task> getTasksByProjectIdAndStatus(String projectId, String status) {
        return taskRepository.findAllByProjectIdAndStatus(projectId, status);
    }

    public List<Task> getUserTasksByProject(String userId, String projectId) {
        UserCred user = userCredRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return taskRepository.findByProjectIdAndIdIn(projectId, user.getTasks());
    }

    public void changeTaskStatus(String taskId, String status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);

        taskRepository.save(task);
    }
}
