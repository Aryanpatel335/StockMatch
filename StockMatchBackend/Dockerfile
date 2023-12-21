# Use Maven Docker image with OpenJDK 17 to build the Spring Boot application
FROM maven:3.8.5-openjdk-17 AS build

# Copy the application's source code into the Docker image
COPY . .

# Package the application, skipping unit tests for build speed
RUN mvn clean package -DskipTests

# Use a slim version of OpenJDK 17 for the final image
FROM openjdk:17.0.1-jdk-slim

# Copy the built JAR file from the previous stage and rename it to app.jar
COPY --from=build /target/StockMatchBackend-0.0.1-SNAPSHOT.jar app.jar

# Inform Docker that the container listens on port 8080
EXPOSE 8080

# Set the entrypoint to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
