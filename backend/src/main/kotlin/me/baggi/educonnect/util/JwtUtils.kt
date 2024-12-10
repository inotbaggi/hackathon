package me.baggi.educonnect.util

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*


@Component
class JwtUtils {
    @Value("\${jwt.signing.key}")
    private val jwtSecret = "secretKey"

    @Value("\${jwt.signing.expirationMs}")
    private val jwtExpirationMs: Long = 86400000

    fun generateJwtToken(username: String): String {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS256, jwtSecret.toByteArray())
            .compact()
    }

    fun parseJwt(request: HttpServletRequest): String? {
        val headerAuth = request.getHeader("Authorization")

        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length)
        }

        return null
    }

    fun getUserNameFromJwtToken(token: String): String {
        return Jwts.parserBuilder().setSigningKey(
            jwtSecret.toByteArray()
        ).build().parseClaimsJws(token).body.subject
    }

    fun validateJwtToken(authToken: String): Boolean {
        return try {
            Jwts.parserBuilder().setSigningKey(
                jwtSecret.toByteArray()
            ).build().parseClaimsJws(authToken)
            true
        } catch (e: Exception) {
            false
        }
    }
}