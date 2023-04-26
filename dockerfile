# Use a base image of Ubuntu 20.04
FROM ubuntu:20.04

# Update package list and install Java 17 and Maven
RUN apt-get update && apt-get install -y openjdk-17-jdk maven

# Clone the GitHub repository (optional if you have the source code locally)
# RUN git clone https://github.com/Alfesito/ISST-Grupo13-NutriApp.git

# Set the working directory to the cloned repository
WORKDIR /ISST-Grupo13-NutriApp

# Copy the source code into the Docker image
COPY . .

# Compile and run the application using Maven
CMD ["./mvnw", "clean", "spring-boot:run", "-DskipTests=true"]

# Expose port 8080 (change the number if your application uses a different port)
EXPOSE 8080

# Pasos para contruir la imagen un ejecutar el contenedor:
#     $ docker build -t nutri-app .
#     $ docker run -p 8080:8080 nutri-app

# Eliminar la imagen:
#     $ docker rmi -f nutri-app