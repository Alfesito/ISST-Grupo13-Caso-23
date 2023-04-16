package es.upm.dit.isst.nutriapp.grupo13.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;

@RestController
public class UsuariosRestController {
    private final UsuariosRepository usuariosRepository;
    public UsuariosRestController(UsuariosRepository t) {
        this.usuariosRepository = t;
    }

    @GetMapping("/usuarios")
    List<Usuarios> readAll() {
      return (List<Usuarios>) usuariosRepository.findAll();
    }
}
