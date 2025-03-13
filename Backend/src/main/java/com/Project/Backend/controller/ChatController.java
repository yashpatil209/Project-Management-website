package com.Project.Backend.controller;

import com.Project.Backend.model.ChatMessage;
import com.Project.Backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatService.saveMessage(chatMessage);
    }

    @GetMapping("/{sender}/{receiver}")
    public List<ChatMessage> getChatHistory(@PathVariable String sender, @PathVariable String receiver) {
        return chatService.getMessages(sender, receiver);
    }
}
