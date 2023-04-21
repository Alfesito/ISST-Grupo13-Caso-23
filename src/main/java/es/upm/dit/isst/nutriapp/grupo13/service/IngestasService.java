package es.upm.dit.isst.nutriapp.grupo13.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.upm.dit.isst.nutriapp.grupo13.model.Ingestas;
import es.upm.dit.isst.nutriapp.grupo13.repository.IngestasRepository;

@Service
public class IngestasService implements IIngestasService{
    
    @Autowired
    private IngestasRepository repository;

    @Override
    public void remove(String id) {
        repository.deleteById(id);
    }

    @Override
    public void save(Ingestas ingesta) {
        repository.save(ingesta);
    }
}
