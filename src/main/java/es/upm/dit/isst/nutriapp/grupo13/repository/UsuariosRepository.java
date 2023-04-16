package es.upm.dit.isst.nutriapp.grupo13.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;

public interface UsuariosRepository extends CrudRepository<Usuarios, Integer>{
    List<Usuarios> findById(int id);
}
