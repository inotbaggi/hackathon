package me.baggi.educonnect.config

import me.baggi.educonnect.auth.AuthEntryPoint
import me.baggi.educonnect.auth.AuthFilter
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfiguration(
    private val authEntryPoint: AuthEntryPoint,
    private val userDetailsService: UserDetailsService,
) {
    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
         http.csrf { it.disable() }
            .exceptionHandling { exceptionHandling -> exceptionHandling.authenticationEntryPoint(authEntryPoint) }
            .sessionManagement {it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .authorizeHttpRequests  {
                it.requestMatchers(
                    "/api/v1/auth/login",
                    "/api/v1/auth/register",
                ).permitAll()
                //it.anyRequest().authenticated()
            }
            .addFilterBefore(authJwtFilter(), UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }

    @Bean
    fun daoAuthProvider(): DaoAuthenticationProvider {
        val authProvider = DaoAuthenticationProvider()

        authProvider.setPasswordEncoder(passwordEncoder())
        authProvider.setUserDetailsService(userDetailsService)

        return authProvider
    }

    @Bean
    fun authenticationManager(http: HttpSecurity): AuthenticationManager {
        val manager = http.getSharedObject(AuthenticationManagerBuilder::class.java)
        manager.authenticationProvider(daoAuthProvider())
        return manager.build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder = BCryptPasswordEncoder()

    @Bean
    fun authJwtFilter(): AuthFilter = AuthFilter()
}