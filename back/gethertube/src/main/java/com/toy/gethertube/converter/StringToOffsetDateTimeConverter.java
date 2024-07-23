package com.toy.gethertube.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class StringToOffsetDateTimeConverter implements Converter<String, OffsetDateTime> {

    @Override
    public OffsetDateTime convert(String source) {
        // Parse the String to OffsetDateTime
        return OffsetDateTime.parse(source, DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }
}