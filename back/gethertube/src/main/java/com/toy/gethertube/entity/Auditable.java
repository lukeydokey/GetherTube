package com.toy.gethertube.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;

@Document
@Getter
@Setter
public abstract class Auditable implements Persistable<String> {
    @CreatedDate
    private OffsetDateTime createdDate;

    @LastModifiedDate
    private OffsetDateTime lastModifiedDate;

    @Override
    public boolean isNew() {
        return createdDate == null;
    }
}
