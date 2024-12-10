package me.baggi.educonnect.controller

import me.baggi.educonnect.model.Role
import me.baggi.educonnect.model.User
import me.baggi.educonnect.model.dto.AuthRequest
import me.baggi.educonnect.model.dto.AuthResponse
import me.baggi.educonnect.service.AuthService
import me.baggi.educonnect.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(
    private val authService: AuthService,
    private val userService: UserService,
    private val passwordEncoder: PasswordEncoder
) {
    @PostMapping("/login")
    fun login(@RequestBody request: AuthRequest.Login): ResponseEntity<AuthResponse.Authorized> {
        val (jwt, role) = authService.authenticate(request.email, request.password)
        return ResponseEntity.ok(AuthResponse.Authorized(jwt, role))
    }

    @PostMapping("/register")
    fun register(@RequestBody request: AuthRequest.Register): ResponseEntity<*> {
        if (userService.existsByEmail(request.email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists")
        }

        val user = User(
            email = request.email,
            fio = request.fio,
            password = passwordEncoder.encode(request.password),
            role = Role.STUDENT
        )

        userService.save(user)

        return ResponseEntity.status(HttpStatus.CREATED).body("Registered successfully!")
    }
}