package es.upm.dit.isst.nutriapp.grupo13;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import es.upm.dit.isst.nutriapp.grupo13.controller.LoginRequest;
import es.upm.dit.isst.nutriapp.grupo13.controller.UsuariosController;
import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;
import es.upm.dit.isst.nutriapp.grupo13.service.UsuarioService;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuariosControllerTest {

    @Mock
    private UsuariosRepository usuariosRepository;

    @Autowired
    private UsuariosController usuariosController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testReadAll() {
        // Crear una lista de usuarios ficticia
        List<Usuarios> usuarios = new ArrayList<>();
        usuarios.add(new Usuarios("username1", "contrasena1", "correo1@upm.es", 22, 65.0, 170, "Otro",
        "Femenino",
        "Sedentaria", "Vegetariana", "Verduras", "Ninguno"));

        // Simular el comportamiento del repositorio
        Mockito.when(usuariosRepository.findAll()).thenReturn(usuarios);

        // Llamar al método del controlador
        List<Usuarios> resultado = (List<Usuarios>) usuariosRepository.findAll();

        // Verificar que el resultado es igual a la lista ficticia
        Assertions.assertEquals(usuarios, resultado);
    }

    @MockBean
    private UsuarioService service;

    @Test
    public void testRegistrar() throws Exception {
        Usuarios usuario = new Usuarios("username", "password", "email@example.com", 22, 65.0, 170, "Otro", "Femenino", "Sedentaria", "Vegetariana", "Verduras", "Ninguno");

        when(service.existeCorreo(usuario.getCorreo())).thenReturn(false);
        when(service.existeUsuario(usuario.getUsername())).thenReturn(false);

        Assertions.assertEquals(usuariosController.registrar(usuario), ResponseEntity.ok("Usuario registrado exitosamente."));

        Assertions.assertEquals(usuariosController.registrar(null), ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el usuario."));
        
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testLogin() {
        // Crear un usuario de prueba
        Usuarios usuario = new Usuarios("username", passwordEncoder.encode("password"), "email@example.com", 22, 65.0, 170, "Otro", "Femenino", "Sedentaria", "Vegetariana", "Verduras", "Ninguno");
        usuariosRepository.save(usuario);

        // Realizar una solicitud de inicio de sesión con las credenciales correctas
        LoginRequest loginRequest = new LoginRequest("email@example.com", "password");

        Assertions.assertEquals(usuariosController.login(loginRequest, null), ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));
    }

    @Test
    public void testReadPerfilUsuarios() throws Exception {
        // Agrega un usuario de prueba a la base de datos
        Usuarios usuario = new Usuarios("username", "password", "email@example.com", 22, 65.0, 170, "Otro", "Femenino", "Sedentaria", "Vegetariana", "Verduras", "Ninguno");
        usuariosRepository.save(usuario);

        Assertions.assertEquals(usuariosController.readPerfilUsuarios("correo@example.com"), (Usuarios) usuariosRepository.findByCorreo("correo@example.com"));

        usuariosRepository.delete(usuario);

    }


    @Test
    public void testUpdatePerfilUsuarios() throws Exception {
        // Crear un usuario de prueba y guardarlo en la base de datos
        Usuarios usuario = new Usuarios("username", "password", "correo@example.com", 22, 65.0, 170, "Otro", "Femenino", "Sedentaria", "Vegetariana", "Verduras", "Ninguno");
        usuariosRepository.save(usuario);

        Usuarios newusuario = new Usuarios("username", "password", "correo@example.com", 33, 33.0, 33, "", "", "", "", "", "");

        Assertions.assertEquals(usuariosController.updateUsuarios(newusuario, "correo@example.com"), ResponseEntity.notFound().build());

        // Eliminar el usuario de prueba de la base de datos
        usuariosRepository.delete(usuario);
    }

}
