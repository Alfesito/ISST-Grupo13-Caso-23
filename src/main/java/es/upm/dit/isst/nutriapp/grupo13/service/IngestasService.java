package es.upm.dit.isst.nutriapp.grupo13.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.upm.dit.isst.nutriapp.grupo13.repository.IngestasRepository;

@Service
public class IngestasService {
    @Autowired
    private IngestasRepository repository;
}
