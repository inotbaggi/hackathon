package me.baggi.educonnect.auth

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import java.io.IOException

@Component
class AuthEntryPoint : AuthenticationEntryPoint {
    @Throws(IOException::class)
    override fun commence(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authException: AuthenticationException?
    ) {
        /*if (authException != null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized")
        }*/
    }
}