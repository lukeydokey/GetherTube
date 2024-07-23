package com.toy.gethertube.config;

import com.toy.gethertube.converter.OffsetDateTimeToStringConverter;
import com.toy.gethertube.converter.StringToOffsetDateTimeConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Configuration
public class MongoConfig {
    @Bean
    public MappingMongoConverter mappingMongoConverter(MongoDatabaseFactory factory,
                                                       MongoCustomConversions conversions,
                                                       MongoMappingContext context) {
        MappingMongoConverter converter = new MappingMongoConverter(factory, context);
        converter.setCustomConversions(conversions);
        // Remove _class field
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return converter;
    }

    // OffsetDateTime UTC -> KST 로 변경
    @Bean
    public MongoCustomConversions customConversions() {
        List<Converter<?, ?>> converters = new ArrayList<>();
        converters.add(new OffsetDateTimeToStringConverter());
        converters.add(new StringToOffsetDateTimeConverter());
        return new MongoCustomConversions(converters);
    }

    @Bean(name = "auditingTimeZoneProvider")
    public DateTimeProvider dateTimeProvider() {
        return () -> Optional.of(OffsetDateTime.now(ZoneId.of("Asia/Seoul")));
    }
}
