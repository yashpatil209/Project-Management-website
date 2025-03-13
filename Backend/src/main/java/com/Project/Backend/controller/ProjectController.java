package com.Project.Backend.controller;

import com.Project.Backend.model.Project;
import com.Project.Backend.model.UserCred;
import com.Project.Backend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/new-project/{Id}")
    public ResponseEntity<?> newProject(@RequestBody Project project, @PathVariable String Id){
        String ProjectId = null;
        try {
            ProjectId = projectService.addProject(project, Id);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ProjectId , HttpStatus.OK);
    }


    @GetMapping("/getallmyprojects/{Id}")
    public ResponseEntity<?> getAllMyProjects(@PathVariable String Id){
        List<Project> projects = null;

        try {
            projects = projectService.getAllProjects(Id);

        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(projects , HttpStatus.CREATED);
    }

    //projects that are you working for
    @GetMapping("/getallworkprojects/{Id}")
    public ResponseEntity<?> getAllWorkProjects(@PathVariable String Id){
        List<Project> projects = null;
        try {
            projects = projectService.getAllWorkProjects(Id);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(projects , HttpStatus.CREATED);
    }

    @GetMapping("/allmembers")
    public ResponseEntity<?> getAllMembers(){
        List <String> emails = null;

        try{
            emails = projectService.getAllMembers();
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(emails , HttpStatus.CREATED);
    }

    @GetMapping("/allprojectmembers/{Id}")
    public ResponseEntity<?> getProjectAllMembers(@PathVariable String Id){
        List <String> emails = null;
        try{
            emails = projectService.getProjectAllMembers(Id);
        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(emails , HttpStatus.CREATED);
    }


    @GetMapping("/myproject/{userId}")
    public List<Project> getProjectsByUserId(@PathVariable Long userId) {
        return projectService.findProjectsByUserId(userId);
    }
}
