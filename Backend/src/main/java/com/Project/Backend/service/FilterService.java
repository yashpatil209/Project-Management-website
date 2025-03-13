package com.Project.Backend.service;

import com.Project.Backend.model.Project;
import com.Project.Backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class FilterService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getFilterProjects(String name, String value) {

        if(Objects.equals(name, "status")){
            return projectRepository.findAllByStatus(value);
        }
        return projectRepository.findAllByPriority(value);
    }
}
