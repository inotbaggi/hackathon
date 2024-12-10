package me.baggi.educonnect.model.dto

sealed class AuthResponse {
    data class Authorized(
        val id: Long,
        val token: String,
        val role: String?
    )
}