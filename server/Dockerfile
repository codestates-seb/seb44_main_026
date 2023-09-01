FROM openjdk:11-jdk

WORKDIR /app

# Copy the Gradle Wrapper files
COPY server/gradlew /app/
COPY server/gradle/ /app/gradle/

# Copy the project files and build
COPY server/build.gradle /app/build.gradle
COPY server/settings.gradle /app/settings.gradle
COPY server/src /app/src

# Set execute permission for gradlew
RUN chmod +x /app/gradlew

# Download Gradle dependencies and build the project
RUN ./gradlew build -p /app

COPY server/build/libs/greenNare-0.0.1-SNAPSHOT.jar greenNare-0.0.1-SNAPSHOT.jar

CMD ["java","-jar", "greenNare-0.0.1-SNAPSHOT.jar"]