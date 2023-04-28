#!/bin/bash
set -e

# Change directory to the application directory
cd /ISST-Grupo13-NutriApp

# Perform git pull to update the source code
git pull

# Compile and run the application using Maven
./mvnw clean spring-boot:run -DskipTests=true