FROM openjdk:17-alpine AS builder

# bash 및 dos2unix 설치
RUN apk add --no-cache bash dos2unix

# 빌드 컨텍스트의 gradlew 파일을 복사
COPY gradlew /app/gradlew
COPY gradle /app/gradle
COPY build.gradle /app/build.gradle
COPY settings.gradle /app/settings.gradle
COPY src /app/src

# 작업 디렉토리 설정
WORKDIR /app

# gradlew 파일의 줄바꿈 형식 변환 및 실행 권한 부여
RUN dos2unix /app/gradlew && chmod +x ./gradlew && ls -l ./gradlew

RUN /bin/bash ./gradlew bootJar

FROM openjdk:17-alpine

COPY --from=builder /app/build/libs/*.jar gethertubeBE.jar

ENTRYPOINT ["java", "-jar", "/gethertubeBE.jar"]
