# Use Maven Docker image with OpenJDK 17 to build the Spring Boot application
FROM maven:3.8.5-openjdk-17 AS build

# Copy the application's source code into the Docker image
COPY . .

# Package the application, skipping unit tests for build speed
RUN mvn clean package -DskipTests

# Use a slim version of OpenJDK 17 for the final image
FROM openjdk:17.0.1-jdk-slim

# Install cron and curl
RUN apt-get update && apt-get -y install cron curl

# Copy the built JAR file from the previous stage and rename it to app.jar
COPY --from=build /target/StockMatchBackend-0.0.1-SNAPSHOT.jar app.jar

# Copy your cron script into the container
COPY hit_endpoint.sh .
# Make sure the script is executable
RUN chmod +x hit_endpoint.sh

# Add your cron job
RUN echo "*/10 * * * * /hit_endpoint.sh >> /var/log/cron.log 2>&1" | crontab -

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Inform Docker that the container listens on port 8080
EXPOSE 8080

# Set the entrypoint to start cron and your application
ENTRYPOINT cron && java -jar app.jar
