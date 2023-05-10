package es.upm.dit.isst.nutriapp.grupo13.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.*;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/","/login","/signin").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
            .logout()
                .permitAll().and()
            .csrf()
                 .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                 .ignoringAntMatchers("/h2/**")
                 .and()
            //.csrf().disable()
            .headers()
                .frameOptions()
                .sameOrigin()
                .and()
             .requiresChannel().anyRequest().requiresSecure();
            // .httpBasic();
        return http.build();
    }

    @Bean
    protected UserDetailsService jdbUserDetailsService(DataSource dataSource) {
         String userByUsernameQuery = "select correo, contrasena, enabled from users where contrasena=?";

         JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
         users.setUsersByUsernameQuery(userByUsernameQuery);

         return users;
    }


    @Bean
    protected PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
