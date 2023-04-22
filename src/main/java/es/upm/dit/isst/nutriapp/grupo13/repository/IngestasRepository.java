package es.upm.dit.isst.nutriapp.grupo13.repository;
import es.upm.dit.isst.nutriapp.grupo13.model.Ingestas;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface IngestasRepository extends CrudRepository<Ingestas, Long>{
    
    List<Ingestas> findAllByCorreo(String correo);
    // void deleteById(Long id);
    
    
}
