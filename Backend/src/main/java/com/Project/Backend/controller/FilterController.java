package com.Project.Backend.controller;

import com.Project.Backend.model.Project;
import com.Project.Backend.service.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/filter")
public class FilterController {

    @Autowired
    private FilterService filterService;

    @GetMapping("/getprojects")
    public ResponseEntity<?> getAllProjects(@RequestParam String name, @RequestParam String value){
        List<Project> projects = null;

        try {
            projects = filterService.getFilterProjects(name, value);

        }catch (Exception e){
            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(projects , HttpStatus.OK);
    }
}
