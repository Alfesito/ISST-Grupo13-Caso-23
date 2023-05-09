package es.upm.dit.isst.nutriapp.grupo13;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import es.upm.dit.isst.nutriapp.grupo13.controller.IngestasController;
import es.upm.dit.isst.nutriapp.grupo13.controller.UsuariosController;
import es.upm.dit.isst.nutriapp.grupo13.model.Ingestas;
import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.IngestasRepository;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;

@SpringBootTest
public class IngestasControllerTest {

        @Mock
        private UsuariosRepository usuariosRepository;

        @Autowired
        private UsuariosController usuariosController;

        @BeforeEach
        public void setUp() {
                MockitoAnnotations.openMocks(this);
        }

        @Autowired
        private IngestasRepository ingestasRepository;

        @Autowired
        private IngestasController ingestasController;

        @Test
        public void testReadIngestas() throws Exception {

                // Agrega un usuario de prueba a la base de datos
                Usuarios usuario = (new Usuarios("username", "password", "email@example.com", 22, 65.0, 170, "Otro",
                                "Femenino",
                                "Sedentaria", "Vegetariana", "Verduras", "Ninguno"));

                usuariosRepository.save(usuario);

                List<Ingestas> nullingesta = null;
                List<Ingestas> ingestas = new ArrayList<>();
                ingestas.add(new Ingestas((long) 134, "email@example.com", LocalDate.now(), "Agua", 12.0, 12.0, 22.0,
                                55.0, 44.0, "A"));
        
                Ingestas ingesta2 = new Ingestas((long) 134, "mail@example.com", LocalDate.now(), "Agua", 12.0, 12.0, 22.0,
                55.0, 44.0, "A");
                ingestasRepository.save(ingesta2);

                Mockito.when(ingestasRepository.findAllByCorreo("email@example.com")).thenReturn(ingestas);

                List<Ingestas> resultado = (List<Ingestas>) ingestasRepository.findAllByCorreo("email@example.com");

                assertNotEquals(resultado, (List<Ingestas>) ingestasRepository.findAllByCorreo("mail@example.com"));

                assertEquals(ingestasController.readAllIngestas("mail@exampl.com"),
                        (List<Ingestas>) ingestasRepository.findAllByCorreo("mail@exampl.com"));

                // meter asserNull
                usuariosRepository.delete(usuario);
                ingestasRepository.deleteAll();

                assertNull(nullingesta);
        }

        @Test
        public void testAñadirIngesta() {
                // Agrega un usuario de prueba a la base de datos
                Usuarios usuario = new Usuarios("username", "password", "email@example.com", 22, 65.0, 170, "Otro",
                                "Femenino",
                                "Sedentaria", "Vegetariana", "Verduras", "Ninguno");
                usuariosRepository.save(usuario);

                Ingestas ingesta = new Ingestas((long) 134, "email@example.com", LocalDate.now(), "Agua", 12.0, 12.0,
                                22.0,
                                55.0, 44.0, "A");
                ingestasRepository.save(ingesta);

                // Comprobar que la respuesta es 200 OK
                assertEquals(ingestasController.añadirIngesta(ingesta, null),
                                ResponseEntity.ok("Alimento registrado exitosamente."));

                // Comprobar que el mensaje de la respuesta es correcto
                assertEquals(ingestasController.añadirIngesta(null, null), ResponseEntity
                                .status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el alimento."));

                usuariosRepository.delete(usuario);
                ingestasRepository.delete(ingesta);
        }

        @Test
        public void testEliminarIngesta() {
                Ingestas ingesta = new Ingestas((long) 134, "email@example.com", LocalDate.now(), "Agua", 12.0, 12.0,
                                22.0,
                                55.0, 44.0, "A");
                ingestasRepository.save(ingesta);

                assertNotNull(ingesta.getId());

                // Assertions.assertTrue(ingestasRepository.existsById(ingesta.getId()));

                ingestasRepository.delete(ingesta);

                // Comprobar que la ingesta se ha eliminado correctamente
                assertFalse(ingestasRepository.existsById(ingesta.getId()));
        }

}

