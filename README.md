# Comando para correr Spring Boot
    - MAC: 
        
        $ ./mvnw clean install spring-boot:run -DskipTests=true

    - Windows(no se han comprobado estos comandos):
        
        $ .\mvnw install    -> Solo la primera vez para instalar
        $ .\mvnw run

# Pasos para clonar el repositorio con la rama master:

        $ git clone https://github.com/Alfesito/ISST-Grupo13-NutriApp.git
        $ git checkout master

# Pasos para subir al repositorio
    
        $ git add .
        $ git commit -m "ejemplo commit"
        $ git push -u origin master

## Para ver en que branch trabajamos y cambiar:

        $ git branch
        $ git checkout <branch>
