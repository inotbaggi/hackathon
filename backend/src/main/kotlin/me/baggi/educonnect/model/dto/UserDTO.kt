package me.baggi.educonnect.model.dto

import me.baggi.educonnect.model.*

data class UserDTO(
    val id: Long,
    val email: String,
    val fio: String,
    var role: Role,
    var verified: Boolean,
    var verificationCanceled: Boolean ,
    var studentProfile: StudentProfileDTO?,
    var teacherProfile: TeacherProfileDTO?,
    var employerProfile: EmployerProfileDTO?
)

data class StudentProfileDTO(
    val educationalInstitution: String,
    val group: String,
)

data class TeacherProfileDTO(
    val educationalInstitution: String,
    val subject: String,
)

data class EmployerProfileDTO(
    val companyName: String,
    val position: String,
)

fun User.toDTO(): UserDTO {
    return UserDTO(
        id = this.id,
        email = this.email,
        fio = this.fio,
        role = this.role,
        verified = this.verified,
        verificationCanceled = this.verificationCanceled,
        studentProfile = this.studentProfile?.toDTO(),
        teacherProfile = this.teacherProfile?.toDTO(),
        employerProfile = this.employerProfile?.toDTO()
    )
}

fun StudentProfile.toDTO(): StudentProfileDTO {
    return StudentProfileDTO(
        educationalInstitution = this.educationalInstitution,
        group = this.group
    )
}

fun TeacherProfile.toDTO(): TeacherProfileDTO {
    return TeacherProfileDTO(
        educationalInstitution = this.educationalInstitution,
        subject = this.subject
    )
}

fun EmployerProfile.toDTO(): EmployerProfileDTO {
    return EmployerProfileDTO(
        companyName = this.companyName,
        position = this.position
    )
}
