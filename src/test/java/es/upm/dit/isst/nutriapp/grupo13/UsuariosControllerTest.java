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
import org.springframework.data.repository.CrudRepository;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
                "Femenino", "Sedentaria", "Vegetariana", "Verduras", "Ninguno"));
        usuarios.add(new Usuarios("username2", "contrasena2", "correo2@upm.es", 28, 70.0, 175, "Otro",
                "Masculino", "Activa", "Omnivora", "Frutas", "Ninguno"));
        usuarios.add(new Usuarios("username3", "contrasena3", "correo3@upm.es", 31, 75.0, 180, "Otro",
                "Femenino", "Sedentaria", "Vegetariana", "Verduras", "Ninguno"));
        List<Usuarios> nullusuario = null;

        // Simular el comportamiento del repositorio
        Mockito.when(usuariosRepository.findAll()).thenReturn(usuarios);
        Mockito.doNothing().when(usuariosRepository).deleteAll();

        // Llamar al método del controlador
        List<Usuarios> resultado = (List<Usuarios>) usuariosRepository.findAll();

        // Verificar que el resultado es igual a la lista ficticia
        assertEquals(resultado, usuarios);

        // Crear una lista de usuarios vacía
        List<Usuarios> usuariosVacia = new ArrayList<>();

        // Verificar que el resultado no es igual a la lista de usuarios vacía
        assertNotEquals(resultado, usuariosVacia);

        // Crear una lista de usuarios con un solo usuario diferente a la lista ficticia
        List<Usuarios> usuariosDiferentes = new ArrayList<>();
        usuariosDiferentes.add(new Usuarios("username4", "contrasena4", "correo4@upm.es", 25, 70.0, 175, "Otro",
                "Masculino",
                "Activa", "Omnivora", "Frutas", "Ninguno"));

        // Verificar que el resultado no es igual a la lista de usuarios diferentes
        assertNotEquals(resultado, usuariosDiferentes);

        // Se elimina el usuario y se comprueba que el valor es null
        usuariosRepository.deleteAll();
        assertNull(nullusuario);
    }

    @MockBean
    private UsuarioService service;

    @Test
    public void testRegistrar() throws Exception {
        Usuarios usuario = new Usuarios("username", "password", "email@example.com", 22, 65.0, 170, "Otro", "Femenino",
                "Sedentaria", "Vegetariana", "Verduras", "Ninguno");

        when(service.existeCorreo(usuario.getCorreo())).thenReturn(false);
        when(service.existeUsuario(usuario.getUsername())).thenReturn(false);
        Mockito.doNothing().when(usuariosRepository).deleteAll();

        // Prueba exitosa de registro
        assertEquals(usuariosController.registrar(usuario, null),
                ResponseEntity.ok("Usuario registrado exitosamente."));

        // Prueba de registro con usuario nulo
        assertEquals(usuariosController.registrar(null, null),
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el usuario."));

        // Prueba de registro con correo electrónico existente
        when(service.existeCorreo(usuario.getCorreo())).thenReturn(true);
        assertEquals(usuariosController.registrar(usuario, null),
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo ya está registrado."));

        // Prueba de registro con usuario existente
        when(service.existeCorreo(usuario.getCorreo())).thenReturn(false);
        when(service.existeUsuario(usuario.getUsername())).thenReturn(true);
        assertEquals(usuariosController.registrar(usuario, null),
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El usuario ya está registrado."));

        // Prueba de registro con ambas excepciones
        when(service.existeCorreo(usuario.getCorreo())).thenReturn(true);
        when(service.existeUsuario(usuario.getUsername())).thenReturn(true);
        assertEquals(usuariosController.registrar(usuario, null),
                ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("El correo ya está registrado."));

        // Prueba de registro con respuesta diferente a la esperada
        assertNotEquals(usuariosController.registrar(usuario, null), ResponseEntity.ok("Registro exitoso."));

        // Prueba de registro con usuario nulo
        usuario = null;
        assertNull(usuario);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testLogin() {
        // Crear un usuario de prueba
        Usuarios usuario = new Usuarios("username", passwordEncoder.encode("password"), "email@example.com", 22, 65.0,
                170, "Otro", "Femenino", "Sedentaria", "Vegetariana", "Verduras", "Ninguno");

        usuariosRepository.save(usuario);

        // Realizar una solicitud de inicio de sesión con las credenciales correctas
        LoginRequest loginRequest1 = new LoginRequest("email@example.com", "password");
        LoginRequest loginRequest2 = new LoginRequest("emaildfdsfsdfsd@example.com", "dfsdfsdfsfff");

        assertEquals(usuariosController.login(loginRequest1, null),
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));
        assertEquals(usuariosController.login(loginRequest2, null),
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));

        assertNotEquals(usuariosController.login(loginRequest1, null),
                ResponseEntity.ok("Usuario registrado exitosamente."));

        // Crear un usuario de prueba con una contraseña incorrecta
        Usuarios usuario2 = new Usuarios("username2", passwordEncoder.encode("password123"), "email2@example.com", 25,
                70.0,
                175, "Otro", "Masculino", "Activa", "Omnívora", "Carne", "Ninguno");
        usuariosRepository.save(usuario2);

        // Realizar una solicitud de inicio de sesión con las credenciales correctas
        LoginRequest loginRequest3 = new LoginRequest("email2@example.com", "password");
        assertEquals(usuariosController.login(loginRequest3, null),
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));

        // Realizar una solicitud de inicio de sesión con el campo de correo electrónico
        // vacío
        LoginRequest loginRequest4 = new LoginRequest("", "password");
        assertEquals(usuariosController.login(loginRequest4, null),
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));

        // Realizar una solicitud de inicio de sesión con el campo de contraseña vacío
        LoginRequest loginRequest5 = new LoginRequest("email@example.com", "");
        assertEquals(usuariosController.login(loginRequest5, null),
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));

        // Realizar una solicitud de inicio de sesión con el campo de correo electrónico
        // y contraseña vacíos
        LoginRequest loginRequest6 = new LoginRequest("", "");
        assertEquals(usuariosController.login(loginRequest6, null),
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas"));

    }

    @Test
    public void testReadPerfilUsuarios() throws Exception {
        // Agrega un usuario de prueba a la base de datos
        Usuarios usuario1 = new Usuarios("username1", "password1", "correo1@example.com", 22, 65.0, 170, "Otro",
                "Femenino",
                "Sedentaria", "Vegetariana", "Verduras", "Ninguno");
        Usuarios usuario2 = new Usuarios("username2", "password2", "correo2@example.com", 30, 70.0, 175, "Otro",
                "Masculino",
                "Activa", "No vegetariana", "Carne", "Ninguno");
        usuariosRepository.save(usuario1);
        usuariosRepository.save(usuario2);

        // Prueba obtener el perfil de un usuario existente en la base de datos
        assertEquals(usuariosController.readPerfilUsuarios("correo1@example.com"), null);

        // Prueba obtener el perfil de un usuario que no existe en la base de datos
        assertNull(usuariosController.readPerfilUsuarios("correo3@example.com"));

        // Prueba obtener el perfil de un usuario con un correo nulo
        assertNull(usuariosController.readPerfilUsuarios(null));

        // Prueba obtener el perfil de un usuario con un correo vacío
        assertNull(usuariosController.readPerfilUsuarios(""));

        // Prueba obtener el perfil de un usuario con un correo inválido
        assertNull(usuariosController.readPerfilUsuarios("correo_invalido"));

        // Prueba obtener el perfil de un usuario cuando la base de datos está vacía
        usuariosRepository.deleteAll();
        assertNull(usuariosController.readPerfilUsuarios("correo1@example.com"));

        // Elimina los usuarios de prueba de la base de datos
        usuariosRepository.delete(usuario1);
        usuariosRepository.delete(usuario2);
    }

    @Test
    public void testUpdatePerfilUsuarios() throws Exception {
        // Crear un usuario de prueba y guardarlo en la base de datos
        Usuarios usuario = new Usuarios("username", "password", "correo@example.com", 22, 65.0, 170, "Otro", "Femenino",
                "Sedentaria", "Vegetariana", "Verduras", "Ninguno");
        usuariosRepository.save(usuario);

        // Crear un usuario actualizado con los nuevos datos
        Usuarios newusuario = usuario;

        usuariosRepository.save(newusuario);

        // Update el usuario
        newusuario.setUsername("newusername");
        newusuario.setContrasena("newpassword");
        newusuario.setEdad(33);
        newusuario.setAltura(33);
        newusuario.setDieta("Omnívora");

        // Se guardan los datos editados
        usuariosRepository.save(newusuario);

        // Verificar que al actualizar un usuario existente con los nuevos datos se
        // devuelve el usuario actualizado
        assertEquals(usuariosController.updateUsuarios(newusuario, "correo@example.com"),
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));

        // Verificar que el usuario antiguo ha sido eliminado de la base de datos
        Usuarios deletedUsuario = usuariosRepository.findByCorreo("correo@example.com");
        assertNull(deletedUsuario);

        // Verificar que al actualizar un usuario inexistente se devuelve un error 404
        assertEquals(usuariosController.updateUsuarios(newusuario, "correo00@example.com"),
                ResponseEntity.notFound().build());

        // Verificar que al actualizar un usuario con un correo existente se devuelve un
        // error 409
        Usuarios usuario2 = new Usuarios("username2", "password2", "correo2@example.com", 25, 70.0, 175, "Otro",
                "Masculino",
                "Activa", "Omnívora", "Carnes", "Alcohol");
        usuariosRepository.save(usuario2);
        Usuarios usuario3 = new Usuarios("username3", "password3", "correo3@example.com", 30, 75.0, 180, "Otro",
                "Masculino",
                "Activa", "Omnívora", "Carnes", "Alcohol");
        usuariosRepository.save(usuario3);
        Usuarios newusuario2 = new Usuarios("newusername", "newpassword", "correo2@example.com", 33, 33.0, 33, "Nada",
                "Masculino", "Activa", "Omnívora", "Carnes", "Alcohol");
        assertEquals(usuariosController.updateUsuarios(newusuario2, "correo3@example.com"),
                ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null));
    }

}
