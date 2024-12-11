package me.baggi.educonnect.controller

import me.baggi.educonnect.model.CompletedCourse
import me.baggi.educonnect.model.Course
import me.baggi.educonnect.model.Lesson
import me.baggi.educonnect.model.dto.CourseRequest
import me.baggi.educonnect.model.dto.LessonRequest
import me.baggi.educonnect.service.CompletedCourseService
import me.baggi.educonnect.service.CourseService
import me.baggi.educonnect.service.LessonService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/courses")
class CourseController(private val courseService: CourseService, private val completedCourseService: CompletedCourseService) {
    @PostMapping
    fun createCourse(
        @RequestBody courseRequest: CourseRequest.Create,
        @RequestParam teacherId: Long
    ): ResponseEntity<Course> {
        val course = courseService.createCourse(courseRequest, teacherId)
        return ResponseEntity.status(HttpStatus.CREATED).body(course)
    }

    @GetMapping
    fun getAllCourses(): List<Course> = courseService.getCourses()

    @PostMapping("/completed")
    fun markCourseAsCompleted(
        @RequestParam userId: Long,
        @RequestParam courseId: Long
    ): ResponseEntity<String> {
        completedCourseService.markCourseAsCompleted(userId, courseId)
        return ResponseEntity.ok("Course marked as completed")
    }

    @GetMapping("/completed/{userId}")
    fun getCompletedCourses(@PathVariable userId: Long): List<CompletedCourse> {
        return completedCourseService.getCompletedCourses(userId)
    }
}

