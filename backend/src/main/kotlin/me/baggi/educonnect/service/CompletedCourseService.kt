package me.baggi.educonnect.service

import jakarta.persistence.EntityNotFoundException
import me.baggi.educonnect.model.CompletedCourse
import me.baggi.educonnect.repository.CompletedCourseRepository
import me.baggi.educonnect.repository.CourseRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class CompletedCourseService(
    private val completedCourseRepository: CompletedCourseRepository,
    private val courseRepository: CourseRepository,
    private val userService: UserService
) {
    fun markCourseAsCompleted(userId: Long, courseId: Long) {
        val user = userService.getUserById(userId)
            ?: throw EntityNotFoundException("User not found")

        val course = courseRepository.findByIdOrNull(courseId)
            ?: throw EntityNotFoundException("Course not found")

        if (completedCourseRepository.existsByUserIdAndCourseId(userId, courseId)) {
            throw IllegalArgumentException("Course already completed")
        }

        val completedCourse = CompletedCourse(user = user, course = course)
        completedCourseRepository.save(completedCourse)
    }

    fun getCompletedCourses(userId: Long): List<CompletedCourse> {
        return completedCourseRepository.findByUserId(userId)
    }
}
