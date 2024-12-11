package me.baggi.educonnect.service

import jakarta.persistence.EntityNotFoundException
import me.baggi.educonnect.model.Course
import me.baggi.educonnect.model.dto.CourseRequest
import me.baggi.educonnect.repository.CourseRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class CourseService(
    private val courseRepository: CourseRepository,
    private val userService: UserService
) {
    fun createCourse(courseRequest: CourseRequest.Create, teacherId: Long): Course {
        val teacher = userService.getUserById(teacherId)
            ?: throw EntityNotFoundException("Teacher not found")

        val course = Course(
            title = courseRequest.title,
            description = courseRequest.description,
            teacher = teacher
        )
        return courseRepository.save(course)
    }

    fun getCourses(): List<Course> = courseRepository.findAll()

    fun getCourseById(id: Long): Course =
        courseRepository.findByIdOrNull(id) ?: throw EntityNotFoundException("Course not found")
}
