package me.baggi.educonnect.model.dto

import me.baggi.educonnect.model.Role

sealed class AuthRequest {
    data class Login(
        val email: String,
        val password: String
    )
    data class Register(
        val fio: String,
        val email: String,
        val password: String,
        val role: Role,
        val educationalInstitution: String? = null,
        val group: String? = null,
        val subject: String? = null,
        val companyName: String? = null,
        val position: String? = null
    )
}