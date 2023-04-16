package es.upm.dit.isst.nutriapp.grupo13.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;

@Controller
public class UsuariosController {
    public static final String VISTA_FORMULARIO = "singin";
    private RestTemplate restTemplate = new RestTemplate();


    @GetMapping("/crear")
        public String crear(Map<String, Object> model) {
                Usuarios usuario = new Usuarios();
                model.put("usuario", usuario);
                model.put("accion", "guardar");
                return VISTA_FORMULARIO;
        }

    @PostMapping("/guardar")
        public String guardar(@Validated Usuarios usuarios, BindingResult result) {
                if (result.hasErrors()) {
                        return VISTA_FORMULARIO;
                }
                try { restTemplate.postForObject("http://localhost:8080/usuarios/", usuarios, Usuarios.class);
                } catch(Exception e) {}
                return "redirect:" + "lista";
        }
}
