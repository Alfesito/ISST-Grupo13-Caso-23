package es.upm.dit.isst.nutriapp.grupo13.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
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
                .antMatchers(",","/login","/signin").permitAll() // Permitir acceso a cualquier ruta sin necesidad de autenticación
                .and()
            .formLogin().disable() // Disable login
            .logout().disable() // Disable logout
            .csrf().disable() // Disable CSRF protection for simplicity, but you should enable it in production
            .httpBasic();
        return http.build();
    }
}
