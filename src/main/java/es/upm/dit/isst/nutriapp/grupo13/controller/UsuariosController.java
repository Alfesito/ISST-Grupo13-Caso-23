package es.upm.dit.isst.nutriapp.grupo13.controller;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;
import es.upm.dit.isst.nutriapp.grupo13.service.IUsuarioService;

@RestController
public class UsuariosController {
        @Autowired
        private IUsuarioService service;

        private final UsuariosRepository usuariosRepository;

    public UsuariosController(UsuariosRepository t) {
        this.usuariosRepository = t;
    }

        @GetMapping("/api/usuarios")
        List<Usuarios> readAll() {
                return (List<Usuarios>) usuariosRepository.findAll();
        }

        @PostMapping("/guardar")
        public void save(@RequestBody Usuarios usuarios) {
                service.save(usuarios);
        }
}
