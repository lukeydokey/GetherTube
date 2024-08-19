package com.toy.gethertube.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "chat")
public class Chat {
    @Id
    private String _id;
    private String roomId;
    private List<String> chats;
}
