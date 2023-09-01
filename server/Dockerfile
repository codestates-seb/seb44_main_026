FROM openjdk:11-jdk

WORKDIR /app
RUN chmod +x gradlew
RUN ./gradlew build -p /server

COPY server/build/libs/greenNare-0.0.1-SNAPSHOT.jar greenNare-0.0.1-SNAPSHOT.jar

CMD ["java","-jar", "greenNare-0.0.1-SNAPSHOT.jar"]