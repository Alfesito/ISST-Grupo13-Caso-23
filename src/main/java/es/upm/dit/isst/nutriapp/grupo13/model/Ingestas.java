package es.upm.dit.isst.nutriapp.grupo13.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Entity
public class Ingestas {
    @Id
    @NotEmpty
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotEmpty
    @Email
    private String correo;
    private LocalDate fecha;
    private String comida;
    private Double kcal;
    private Double proteina;
    private Double carb;
    private Double grasa;
    private Double fibra;

    public Ingestas(){}

    public Ingestas(@NotEmpty Long id, @NotEmpty @Email String correo, LocalDate fecha, String comida, Double kcal,
            Double proteina, Double carb, Double grasa, Double fibra) {
        this.id = id;
        this.correo = correo;
        this.fecha = fecha;
        this.comida = comida;
        this.kcal = kcal;
        this.proteina = proteina;
        this.carb = carb;
        this.grasa = grasa;
        this.fibra = fibra;
    }




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getComida() {
        return comida;
    }

    public void setComida(String comida) {
        this.comida = comida;
    }

    public Double getKcal() {
        return kcal;
    }

    public void setKcal(Double kcal) {
        this.kcal = kcal;
    }

    public Double getProteina() {
        return proteina;
    }

    public void setProteina(Double proteina) {
        this.proteina = proteina;
    }

    public Double getCarb() {
        return carb;
    }

    public void setCarb(Double carb) {
        this.carb = carb;
    }

    public Double getGrasa() {
        return grasa;
    }

    public void setGrasa(Double grasa) {
        this.grasa = grasa;
    }

    public Double getFibra() {
        return fibra;
    }

    public void setFibra(Double fibra) {
        this.fibra = fibra;
    }

    public Object map(Object object) {
        return null;
    }

    
    
}
