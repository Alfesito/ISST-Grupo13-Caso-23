package es.upm.dit.isst.nutriapp.grupo13.service;

import java.util.List;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;


public interface IUsuarioService {
    List<Usuarios> getAll();
    Usuarios getById(String id);
    void remove(String id);
    void save(Usuarios usuario);
    boolean existeCorreo(String correo);
    boolean existeUsuario(String username);
}
