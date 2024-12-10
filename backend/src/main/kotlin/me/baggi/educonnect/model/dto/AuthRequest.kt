package me.baggi.educonnect.model.dto

sealed class AuthRequest {
    data class Login(
        val email: String,
        val password: String
    )
    data class Register(
        val fio: String,
        val email: String,
        val password: String
    )
}