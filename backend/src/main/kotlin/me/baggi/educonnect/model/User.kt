package me.baggi.educonnect.model

import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val email: String,
    val password: String,

    val fio: String,

    var role: Role
)