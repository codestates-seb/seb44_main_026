FROM openjdk:11-jdk

WORKDIR /app

COPY server/gradlew /app/
COPY server/gradle/ /app/gradle/

COPY server/build.gradle /app/build.gradle
COPY server/settings.gradle /app/settings.gradle
COPY server/src /app/src
COPY server/cloudbuild.yaml /app/cloudbuild.yaml

RUN chmod +x /app/gradlew

RUN ./gradlew build -p /app

CMD ["java","-jar", "greenNare-0.0.1-SNAPSHOT.jar"]