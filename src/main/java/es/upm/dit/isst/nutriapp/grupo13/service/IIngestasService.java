package es.upm.dit.isst.nutriapp.grupo13.service;

import es.upm.dit.isst.nutriapp.grupo13.model.Ingestas;

public interface IIngestasService {

    void save(Ingestas ingesta);
    void remove(Long id);
    
}
