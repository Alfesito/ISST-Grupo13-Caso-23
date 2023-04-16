package es.upm.dit.isst.nutriapp.grupo13.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.nutriapp.grupo13.model.Usuarios;
import es.upm.dit.isst.nutriapp.grupo13.repository.UsuariosRepository;

@RestController
public class UsuariosRestController {
    private final UsuariosRepository usuariosRepository;
    public UsuariosRestController(UsuariosRepository t) {
        this.usuariosRepository = t;
    }
    // public static final String VISTA_FORMULARIO = "formulario";
    // private RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/usuarios")
    List<Usuarios> readAll() {
      return (List<Usuarios>) usuariosRepository.findAll();
    }

//     @GetMapping("/crear")
//         public String crear(Map<String, Object> model) {
//                 Usuario usuario = new Usuario();
//                 model.put("Usuario", usuario);
//                 model.put("accion", "guardar");
//                 return VISTA_FORMULARIO;
//         }

//     @PostMapping("/guardar")
//         public String guardar(@Validated Usuario usuario, BindingResult result) {
//                 if (result.hasErrors()) {
//                         return VISTA_FORMULARIO;
//                 }
//                 try { restTemplate.postForObject("http://localhost:8080/usuarios/", usuario, Usuario.class);
//                 } catch(Exception e) {}
//                 return "redirect:" + "lista";
//         }
}
