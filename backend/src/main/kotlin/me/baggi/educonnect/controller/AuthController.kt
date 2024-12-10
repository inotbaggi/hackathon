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
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/api/v1/auth")
class AuthController(
    private val authService: AuthService,
    private val userService: UserService
) {
    @PostMapping("/login")
    fun login(@RequestBody request: AuthRequest.Login): ResponseEntity<AuthResponse.Authorized> {
        val (jwt, role) = authService.authenticate(request.email, request.password)
        val user = userService.findUserByEmail(request.email) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(AuthResponse.Authorized(user.id, jwt, role))
    }

    @PostMapping("/register")
    fun register(@RequestBody request: AuthRequest.Register): ResponseEntity<*> {
        println(request)
        if (userService.existsByEmail(request.email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists")
        }

        userService.createUserWithProfile(request)

        return ResponseEntity.status(HttpStatus.CREATED).body("Registered successfully!")
    }
}