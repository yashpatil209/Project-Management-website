package com.Project.Backend.service;

import com.Project.Backend.model.ChatMessage;
import com.Project.Backend.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatService {
    @Autowired
    private ChatMessageRepository repository;

    public ChatMessage saveMessage(ChatMessage message) {
        return repository.save(message);
    }

    public List<ChatMessage> getMessages(String sender, String receiver) {
        String chatId = sender.compareTo(receiver) < 0 ? sender + "-" + receiver : receiver + "-" + sender;
        return repository.findByChatId(chatId);
    }
}
