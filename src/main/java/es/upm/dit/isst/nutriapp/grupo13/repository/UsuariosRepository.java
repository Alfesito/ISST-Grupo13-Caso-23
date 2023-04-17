package es.upm.dit.isst.nutriapp.grupo13.repository;

import org.springframework.data.repository.CrudRepository;
import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;

public interface UsuariosRepository extends CrudRepository<Usuarios, String>{

    // void remove(String id);
    // List<Usuarios> findById(int id);
}
