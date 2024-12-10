package me.baggi.educonnect.service

import me.baggi.educonnect.util.JwtUtils
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val authenticationManager: AuthenticationManager,
    private val jwtUtils: JwtUtils
) {
    fun authenticate(username: String, password: String): Pair<String, String?> {
        val authentication = authenticationManager.authenticate(UsernamePasswordAuthenticationToken(username, password))
        return jwtUtils.generateJwtToken(authentication.name) to authentication.authorities.firstOrNull()?.authority
    }
}