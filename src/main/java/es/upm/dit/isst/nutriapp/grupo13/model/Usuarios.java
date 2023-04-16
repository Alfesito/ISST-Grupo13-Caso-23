package es.upm.dit.isst.nutriapp.grupo13.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Entity
public class Usuarios{
    @Id
    private int id;
    @NotEmpty
    private String username;
    @NotEmpty
    private String contraseña;
    @NotEmpty
    @Email
    private String correo;
    private int edad;
    private Double peso;
    private String indeseado;
    private String alergia;
    private String dieta;
    private String cocina_fav;

    public Usuarios(){}

    public Usuarios(int id, String username, String contraseña, String correo, int edad, Double peso, String indeseado,
            String alergia, String dieta, String cocina_fav) {
        this.id = id;
        this.username = username;
        this.contraseña = contraseña;
        this.correo = correo;
        this.edad = edad;
        this.peso = peso;
        this.indeseado = indeseado;
        this.alergia = alergia;
        this.dieta = dieta;
        this.cocina_fav = cocina_fav;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getContraseña() {
        return contraseña;
    }
    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
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

    @Override
    public String toString() {
        return "Usuario [id=" + id + ", username=" + username + ", contraseña=" + contraseña + ", correo=" + correo
                + ", edad=" + edad + ", peso=" + peso + ", indeseado=" + indeseado + ", alergia=" + alergia + ", dieta="
                + dieta + ", cocina_fav=" + cocina_fav + "]";
    }
    

}