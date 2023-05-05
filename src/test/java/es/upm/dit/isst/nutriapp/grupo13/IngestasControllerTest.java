package es.upm.dit.isst.nutriapp.grupo13;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import es.upm.dit.isst.nutriapp.grupo13.controller.IngestasController;
import es.upm.dit.isst.nutriapp.grupo13.model.Ingestas;
import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.IngestasRepository;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;

@SpringBootTest
public class IngestasControllerTest {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private IngestasRepository ingestasRepository;

    @Autowired
    private IngestasController ingestasController;

    @Test
    public void testReadIngestas() throws Exception {
        // Agrega un usuario de prueba a la base de datos
        Usuarios usuario = new Usuarios("username", "password", "email@example.com", 22, 65.0, 170, "Otro", "Femenino",
                "Sedentaria", "Vegetariana", "Verduras", "Ninguno");
        usuariosRepository.save(usuario);

        Ingestas ingesta = new Ingestas((long) 134, "email@example.com", LocalDate.now(), "Agua", 12.0, 12.0, 22.0,
                55.0, 44.0, "A");
        ingestasRepository.save(ingesta);

        Assertions.assertEquals(ingestasController.readAllIngestas("mail@example.com"),
                (List<Ingestas>) ingestasRepository.findAllByCorreo("mail@example.com"));

        usuariosRepository.delete(usuario);
        ingestasRepository.delete(ingesta);
    }

    @Test
    public void testAñadirIngesta(){
        // Agrega un usuario de prueba a la base de datos
        Usuarios usuario = new Usuarios("username", "password", "email@example.com", 22, 65.0, 170, "Otro", "Femenino",
                "Sedentaria", "Vegetariana", "Verduras", "Ninguno");
        usuariosRepository.save(usuario);

        Ingestas ingesta = new Ingestas((long) 134, "email@example.com", LocalDate.now(), "Agua", 12.0, 12.0, 22.0,
                55.0, 44.0, "A");
        ingestasRepository.save(ingesta);

        // Comprobar que la respuesta es 200 OK
        Assertions.assertEquals(ingestasController.añadirIngesta(ingesta), ResponseEntity.ok("Alimento registrado exitosamente."));

        // Comprobar que el mensaje de la respuesta es correcto
        Assertions.assertEquals(ingestasController.añadirIngesta(null), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el alimento."));

        usuariosRepository.delete(usuario);
        ingestasRepository.delete(ingesta);
    }

    @Test
    public void testEliminarIngesta() {
        Ingestas ingesta = new Ingestas((long) 134, "email@example.com", LocalDate.now(), "Agua", 12.0, 12.0, 22.0,
                55.0, 44.0, "A");
        ingestasRepository.save(ingesta);

        Assertions.assertNotNull(ingesta.getId());

        // Assertions.assertTrue(ingestasRepository.existsById(ingesta.getId()));

        ingestasRepository.delete(ingesta);

        // Comprobar que la ingesta se ha eliminado correctamente
        Assertions.assertFalse(ingestasRepository.existsById(ingesta.getId()));
    }

}
