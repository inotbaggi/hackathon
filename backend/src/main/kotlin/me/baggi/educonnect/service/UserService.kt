package me.baggi.educonnect.service

import me.baggi.educonnect.model.*
import me.baggi.educonnect.model.dto.AuthRequest
import me.baggi.educonnect.repository.EmployerProfileRepository
import me.baggi.educonnect.repository.StudentProfileRepository
import me.baggi.educonnect.repository.TeacherProfileRepository
import me.baggi.educonnect.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import kotlin.jvm.optionals.getOrNull

@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val studentProfileRepository: StudentProfileRepository,
    private val teacherProfileRepository: TeacherProfileRepository,
    private val employerProfileRepository: EmployerProfileRepository,
) {
    fun findUserByEmail(email: String): User? = userRepository.findByEmail(email)

    fun existsByEmail(email: String) = userRepository.existsUserByEmail(email)

    fun createUserWithProfile(userRequest: AuthRequest.Register): User {
        val user = User(
            email = userRequest.email,
            password = passwordEncoder.encode(userRequest.password),
            fio = userRequest.fio,
            role = userRequest.role
        )

        val savedUser = userRepository.save(user)

        val profile: Any? = when (userRequest.role) {
            Role.STUDENT -> StudentProfile(
                educationalInstitution = userRequest.educationalInstitution!!,
                group = userRequest.group!!,
                user = user
            )
            Role.TEACHER -> TeacherProfile(
                educationalInstitution = userRequest.educationalInstitution!!,
                subject = userRequest.subject!!,
                user = user
            )
            Role.EMPLOYER -> EmployerProfile(
                companyName = userRequest.companyName!!,
                position = userRequest.position!!,
                user = user
            )
            else -> null
        }

        if (profile != null) {
            when (profile) {
                is StudentProfile -> studentProfileRepository.save(profile)
                is TeacherProfile -> teacherProfileRepository.save(profile)
                is EmployerProfile -> employerProfileRepository.save(profile)
            }
        }

        return savedUser
    }

    fun getUserById(id: Long): User? {
        return userRepository.findById(id).orElse(null)
    }

    fun save(user: User) {
        userRepository.save(user)
    }
}