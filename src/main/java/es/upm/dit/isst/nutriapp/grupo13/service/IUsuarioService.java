package es.upm.dit.isst.nutriapp.grupo13.service;

import java.util.List;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;


public interface IUsuarioService {
    List<Usuarios> getAll();
    Usuarios getById(Integer id);
    void remove(Integer id);
    void save(Usuarios usuarios);
}
