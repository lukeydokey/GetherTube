package com.toy.gethertube.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Component
public class OffsetDateTimeToStringConverter implements Converter<OffsetDateTime, String> {

    @Override
    public String convert(OffsetDateTime source) {
        // Convert the OffsetDateTime to KST and format it as a String
        return source.atZoneSameInstant(ZoneId.of("Asia/Seoul"))
                     .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }
}