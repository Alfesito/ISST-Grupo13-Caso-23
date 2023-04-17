package es.upm.dit.isst.nutriapp.grupo13.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

        @PostMapping("/guardar")
        public void save(@RequestBody @Validated Usuarios usuario, BindingResult result) {
                if (result.hasErrors()) {
                        service.save(usuario);
                }
                try {
                        service.save(usuario);
                } catch (Exception e) {
                }
        }

}
