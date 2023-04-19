package es.upm.dit.isst.nutriapp.grupo13.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .headers().frameOptions().disable()
                .and()
            .authorizeRequests()
                .antMatchers("/","/login","/signin").permitAll() // Permitir acceso a cualquier ruta sin necesidad de autenticación
                .and()
            .formLogin() // Habilitar el formulario de inicio de sesión
                .loginPage("/") // Especificar la página de inicio de sesión
                .permitAll() // Permitir acceso a la página de inicio de sesión sin necesidad de autenticación
                .and()
            .logout().disable() // Disable logout
            .csrf().disable() // Disable CSRF protection for simplicity, but you should enable it in production
            .httpBasic().disable(); // Disable HTTP basic authentication
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
