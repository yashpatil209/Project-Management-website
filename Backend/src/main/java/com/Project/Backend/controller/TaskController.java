package com.Project.Backend.controller;

import com.Project.Backend.model.Issue;
import com.Project.Backend.model.Project;
import com.Project.Backend.model.Task;
import com.Project.Backend.model.UserCred;
import com.Project.Backend.repository.TaskRepository;
import com.Project.Backend.repository.UserCredRepository;
import com.Project.Backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserCredRepository userCredRepository;

    @PostMapping("/add_newtask/{Id}")
    public ResponseEntity<?> newTask(@RequestBody Task task ,  @PathVariable String Id){
        try {
             taskService.addNewTask(task , Id);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/getalltasks")
    public List<Task> getAllTasks(@RequestParam String projectId, @RequestParam String status) {
        return taskService.getTasksByProjectIdAndStatus(projectId, status);
    }

    @GetMapping("/byProject/{projectId}/user/{userId}")
    public ResponseEntity<List<Task>> getUserTasksByProject(
            @PathVariable String projectId, @PathVariable String userId) {
        List<Task> tasks = taskService.getUserTasksByProject(userId, projectId);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/changestatus/{taskId}/status/{status}")
    public ResponseEntity<List<Task>> changeTaskStatus(@PathVariable String taskId, @PathVariable String status){
        taskService.changeTaskStatus(taskId, status);
        return new ResponseEntity<>(HttpStatus.OK);
    }





//    @PostMapping("/add_taskmember/{Id}")
//    public ResponseEntity<?> addTaskMembers(@RequestBody List<String> emails , @PathVariable Long Id){
//        try {
//            taskService.addTaskMembers(emails , Id);
//        }catch (Exception e){
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @GetMapping("/getalltasks")
//    public ResponseEntity<?> getAllTasks(@RequestParam Long projectId , @RequestParam String status){
//        List<Task> projects = null;
//        try {
//            projects = taskService.getAllTaskByProjectId(projectId , status);
//        }catch (Exception e){
//            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(projects , HttpStatus.OK);
//    }
//
//    @GetMapping("/gettask/{status}")
//    public ResponseEntity<?> getTaskByStatus(@PathVariable String status){
//        List<Task> projects = null;
//
//        try {
//            projects = taskService.getAllTasks(status);
//
//        }catch (Exception e){
//            return new ResponseEntity<>(e , HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(projects , HttpStatus.OK);
//    }
//
//    @PostMapping("/raise-issue/{Id}")
//    public ResponseEntity<?> raiseIssue(@RequestBody Issue issue, @PathVariable Long Id ){
//        try {
//            taskService.raiseIssue(issue , Id);
//        }catch (Exception e){
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @GetMapping("/getissue/{Id}")
//    public ResponseEntity<?> getIssue(@PathVariable Long Id ){
//        List<Issue> issues = null;
//        try {
//            issues = taskService.getIssue(Id);
//        }catch (Exception e){
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<>(issues , HttpStatus.OK);
//    }
//
//    @GetMapping("/user/{userId}/project/{projectId}")
//    public ResponseEntity<List<Task>> getTasks(@PathVariable Long userId, @PathVariable Long projectId) {
//        List<Task> tasks = taskService.getTasksByUserAndProject(userId, projectId);
//        return ResponseEntity.ok(tasks);
//    }
//
//    @PutMapping("/changestatus")
//    public ResponseEntity<?> changeTaskStatus(@RequestParam Long taskId, @RequestParam String status) {
//        taskService.changeTaskStatus(taskId, status);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
}