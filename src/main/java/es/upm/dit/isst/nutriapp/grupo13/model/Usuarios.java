package es.upm.dit.isst.nutriapp.grupo13.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Entity
public class Usuarios{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotEmpty
    private String username;
    @NotEmpty
    private String contrasena;
    @NotEmpty
    @Email
    private String correo;
    private int edad;
    private Double peso;
    private Double altura;
    private String indeseado;
    private String alergia;
    private String dieta;
    private String cocina_fav;

    public Usuarios(){}

    public Usuarios(String username, String contrasena, String correo, int edad, Double peso, String indeseado,
            String alergia, String dieta, String cocina_fav, Double altura) {
        this.username = username;
        this.contrasena = contrasena;
        this.correo = correo;
        this.edad = edad;
        this.peso = peso;
        this.indeseado = indeseado;
        this.alergia = alergia;
        this.dieta = dieta;
        this.cocina_fav = cocina_fav;
        this.altura = altura;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public int getEdad() {
        return edad;
    }
    public void setEdad(int edad) {
        this.edad = edad;
    }
    public Double getPeso() {
        return peso;
    }
    public void setPeso(Double peso) {
        this.peso = peso;
    }
    public String getIndeseado() {
        return indeseado;
    }
    public void setIndeseado(String indeseado) {
        this.indeseado = indeseado;
    }
    public String getAlergia() {
        return alergia;
    }
    public void setAlergia(String alergia) {
        this.alergia = alergia;
    }
    public String getDieta() {
        return dieta;
    }
    public void setDieta(String dieta) {
        this.dieta = dieta;
    }
    public String getCocina_fav() {
        return cocina_fav;
    }
    public void setCocina_fav(String cocina_fav) {
        this.cocina_fav = cocina_fav;
    }

    public Double getAltura() {
        return altura;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    @Override
    public String toString() {
        return "Usuarios [username=" + username + ", contrasena=" + contrasena + ", correo=" + correo
                + ", edad=" + edad + ", peso=" + peso + ", altura=" + altura + ", indeseado=" + indeseado + ", alergia="
                + alergia + ", dieta=" + dieta + ", cocina_fav=" + cocina_fav + "]";
    }
}