package es.upm.dit.isst.nutriapp.grupo13.controller;

import java.io.Console;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;
import es.upm.dit.isst.nutriapp.grupo13.service.IUsuarioService;

@RestController
public class UsuariosController {
        @Autowired
        private IUsuarioService service;
        @Autowired
        private PasswordEncoder passwordEncoder;

        private final UsuariosRepository usuariosRepository;

        public UsuariosController(UsuariosRepository t) {
                this.usuariosRepository = t;
        }

        @GetMapping("/api/usuarios")
        List<Usuarios> readAll() {
                return (List<Usuarios>) usuariosRepository.findAll();
        }

        @PostMapping("/registrar/usuario")
        public ResponseEntity<String> registrar(@RequestBody @Validated Usuarios usuario) {
                try {
                        // Verificar si el correo ya existe en la base de datos
                        if (service.existeCorreo(usuario.getCorreo())) {
                                return ResponseEntity.badRequest().body("El correo ya está registrado.");
                        }
                        // Verificar si el usuario ya existe en la base de datos
                        else if (service.existeUsuario(usuario.getUsername())) {
                                return ResponseEntity.badRequest().body("El usuario ya está registrado.");
                        } else {
                                // Codificar la contraseña antes de guardarla en la base de datos
                                String passwordCodificada = passwordEncoder.encode(usuario.getContrasena());
                                usuario.setContrasena(passwordCodificada);
                                // Registrar el usuario si el correo y usuario no existen en la base de datos
                                service.save(usuario);
                                return ResponseEntity.ok("Usuario registrado exitosamente.");
                        }

                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body("Error al registrar el usuario.");
                }
        }

        @PostMapping("/login/usuario")
        public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
                // Obtener el correo y la contraseña proporcionados por el usuario
                String correo = loginRequest.getCorreo();
                String contraseña = loginRequest.getContraseña();

                // Consultar el usuario registrado en la base de datos
                Usuarios usuario = usuariosRepository.findByCorreo(correo); // Suponiendo que tienes un método
                                                                            // findByCorreo() en tu repositorio para
                                                                            // buscar un usuario por correo electrónico

                // Validar las credenciales del usuario
                if (usuario != null && passwordEncoder.matches(contraseña, usuario.getContrasena())) {
                        // Obtener la sesión actual
                        HttpSession session = request.getSession(true);

                        // Almacenar la información del usuario en la sesión
                        session.setAttribute("correo", correo);

                        return ResponseEntity.ok("Inicio de sesión exitoso");
                } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
                }
        }

        @GetMapping("/api/perfil/{correo}")
        public Usuarios readPerfilUsuarios(@PathVariable String correo) {
                return (Usuarios) usuariosRepository.findByCorreo(correo);
        }

        @PutMapping("/api/modificar/perfil/{correo}")
        public ResponseEntity<String> updateUsuarios(@RequestBody Usuarios newUsuario, @PathVariable String correo) {
                try {
                        Usuarios usuario = usuariosRepository.findByCorreo(correo);
                        if (usuario == null) {
                                return ResponseEntity.notFound().build();
                        }
                        
                        usuario.setPeso(newUsuario.getPeso());
                        usuario.setAltura(newUsuario.getAltura());
                        usuario.setEdad(newUsuario.getEdad());
                        usuario.setIndeseado(newUsuario.getIndeseado());
                        usuario.setAlergia(newUsuario.getAlergia());
                        usuario.setDieta(newUsuario.getDieta());
                        usuario.setCocina_fav(newUsuario.getCocina_fav());
                        usuario.setSexo(newUsuario.getSexo());
                        usuario.setActividad(newUsuario.getActividad());

                        usuariosRepository.save(usuario);
                        return ResponseEntity.ok().body("Usuario actualizado");
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error al actualizar el usuario: " + e.getMessage());
                }
        }

}
