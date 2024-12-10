package me.baggi.educonnect.model

import com.fasterxml.jackson.annotation.JsonIgnore
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

    var role: Role,
    var verified: Boolean = false,
    var verificationCanceled: Boolean = false,

    @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL])
    var studentProfile: StudentProfile? = null,

    @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL])
    var teacherProfile: TeacherProfile? = null,

    @OneToOne(mappedBy = "user", cascade = [CascadeType.ALL])
    var employerProfile: EmployerProfile? = null
)

@Entity
@Table(name = "student_profiles")
data class StudentProfile(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val educationalInstitution: String,
    @Column(name = "group_name")
    val group: String,

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User
)

@Entity
@Table(name = "teacher_profiles")
data class TeacherProfile(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val educationalInstitution: String,
    val subject: String,

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User
)

@Entity
@Table(name = "employer_profiles")
data class EmployerProfile(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val companyName: String,
    val position: String,

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User
)