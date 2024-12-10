package me.baggi.educonnect.service

import me.baggi.educonnect.model.User
import me.baggi.educonnect.repository.UserRepository
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class UserService(
    private val userRepository: UserRepository
) {
    fun findUserById(id: Long): User? = userRepository.findById(id).getOrNull()

    fun findUserByEmail(email: String): User? = userRepository.findByEmail(email)

    fun existsByEmail(email: String) = userRepository.existsUserByEmail(email)

    fun save(user: User) {
        userRepository.save(user)
    }
}