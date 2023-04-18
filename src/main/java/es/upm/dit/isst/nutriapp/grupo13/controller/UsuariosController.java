package es.upm.dit.isst.nutriapp.grupo13.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;
import es.upm.dit.isst.nutriapp.grupo13.service.IUsuarioService;

@RestController
public class UsuariosController {
        @Autowired
        private IUsuarioService service;
        private final UsuariosRepository usuariosRepository;
        private RestTemplate restTemplate = new RestTemplate();

        public UsuariosController(UsuariosRepository t) {
                this.usuariosRepository = t;
        }

        @GetMapping("/api/usuarios")
        List<Usuarios> readAll() {
                return (List<Usuarios>) usuariosRepository.findAll();
        }

        @PostMapping("/registrar/usuario")
        public ResponseEntity<?> registrar(@RequestBody @Validated Usuarios usuario, BindingResult result) {
                try {
                        // Verificar si el correo ya existe en la base de datos
                        if (service.existeCorreo(usuario.getCorreo())) {
                                return ResponseEntity.badRequest().body("El correo ya está registrado.");
                        }
                        // Verificar si el usuario ya existe en la base de datos
                        else if (service.existeUsuario(usuario.getUsername())) {
                                return ResponseEntity.badRequest().body("El usuario ya está registrado.");
                        }else{
                                // Registrar el usuario si el correo y usuario no existen en la base de datos
                                service.save(usuario);
                                return ResponseEntity.ok("Usuario registrado exitosamente.");
                        }
                        
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el usuario.");

                }
        }

}
