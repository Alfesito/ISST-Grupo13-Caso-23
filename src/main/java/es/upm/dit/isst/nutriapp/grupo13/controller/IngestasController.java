package es.upm.dit.isst.nutriapp.grupo13.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.nutriapp.grupo13.model.Ingestas;
import es.upm.dit.isst.nutriapp.grupo13.repository.IngestasRepository;
import es.upm.dit.isst.nutriapp.grupo13.service.IIngestasService;

@RestController
public class IngestasController {

        @Autowired
        private IIngestasService service;

        private final IngestasRepository ingestasRepository;
                public IngestasController(IngestasRepository t) {
                        this.ingestasRepository = t;
                }


        @GetMapping("/api/ingestas/{correo}")
        List<Ingestas> readAllIngestas(@PathVariable String correo) {
                return (List<Ingestas>) ingestasRepository.findAllByCorreo(correo);
        }

        @PostMapping("/api/añadir/ingestas/{correo}")
        public ResponseEntity<String> añadirIngesta(@RequestBody Ingestas ingesta, BindingResult result) {
                try {
                        service.save(ingesta);
                        return ResponseEntity.ok("Alimento registrado exitosamente.");
                } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el alimento.");
                }
        }
}


