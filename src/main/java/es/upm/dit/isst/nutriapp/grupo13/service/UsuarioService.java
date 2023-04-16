package es.upm.dit.isst.nutriapp.grupo13.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;

@Service
public class UsuarioService implements IUsuarioService{
    @Autowired
    private UsuariosRepository repository;

    @Override
    public List<Usuarios> getAll() {
        return (List<Usuarios>) repository.findAll();
    }

    @Override
    public Usuarios getById(Integer id) {
        return (Usuarios) repository.findById(id).get();
    }

    @Override
    public void remove(Integer id) {
        repository.deleteById(id);
    }

    @Override
    public void save(Usuarios usuario) {
        repository.save(usuario);
    }
}
