package es.upm.dit.isst.nutriapp.grupo13.controller;

public class LoginRequest {
    private String correo;
    private String contraseña;
  
    // Constructor vacío
    public LoginRequest() {
    }
  
    // Constructor con parámetros
    public LoginRequest(String correo, String contraseña) {
      this.correo = correo;
      this.contraseña = contraseña;
    }
  
    // Getters y Setters
    public String getCorreo() {
      return correo;
    }
  
    public void setCorreo(String correo) {
      this.correo = correo;
    }
  
    public String getContraseña() {
      return contraseña;
    }
  
    public void setContraseña(String contraseña) {
      this.contraseña = contraseña;
    }
  }
  