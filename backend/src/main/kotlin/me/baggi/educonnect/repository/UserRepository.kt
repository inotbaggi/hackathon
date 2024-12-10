package me.baggi.educonnect.repository

import me.baggi.educonnect.model.EmployerProfile
import me.baggi.educonnect.model.StudentProfile
import me.baggi.educonnect.model.TeacherProfile
import me.baggi.educonnect.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun existsUserByEmail(email: String): Boolean

    fun findByEmail(email: String): User?
}
@Repository
interface StudentProfileRepository : JpaRepository<StudentProfile, Long>
@Repository
interface TeacherProfileRepository : JpaRepository<TeacherProfile, Long>
@Repository
interface EmployerProfileRepository : JpaRepository<EmployerProfile, Long>