package com.toy.gethertube.config;

import com.toy.gethertube.service.ChatSubscriber;
import com.toy.gethertube.service.PlayInfoSubscriber;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory factory
    ) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer());

        return template;
    }

    @Bean
    RedisMessageListenerContainer container(
            RedisConnectionFactory connectionFactory,
            @Qualifier("chatListenerAdapter") MessageListenerAdapter chatListenerAdapter,
            @Qualifier("playInfoListenerAdapter") MessageListenerAdapter playInfoListenerAdapter
    ) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(chatListenerAdapter, new PatternTopic("*chat*"));
        container.addMessageListener(playInfoListenerAdapter, new PatternTopic("*playInfo*"));
        return container;
    }

    @Bean
    MessageListenerAdapter chatListenerAdapter(ChatSubscriber chatSubscriber){
        return new MessageListenerAdapter(chatSubscriber, "onMessage");
    }

    @Bean
    MessageListenerAdapter playInfoListenerAdapter(PlayInfoSubscriber playInfoSubscriber){
        return new MessageListenerAdapter(playInfoSubscriber, "handlePlayInfo");
    }
}
