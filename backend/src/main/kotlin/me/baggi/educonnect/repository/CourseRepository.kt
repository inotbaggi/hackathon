package me.baggi.educonnect.repository

import me.baggi.educonnect.model.CompletedCourse
import me.baggi.educonnect.model.Course
import me.baggi.educonnect.model.Lesson
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CourseRepository : JpaRepository<Course, Long> {
}

@Repository
interface LessonRepository : JpaRepository<Lesson, Long> {
    fun findByCourseId(courseId: Long): List<Lesson>
}

@Repository
interface CompletedCourseRepository : JpaRepository<CompletedCourse, Long> {
    fun findByUserId(userId: Long): List<CompletedCourse>
    fun existsByUserIdAndCourseId(userId: Long, courseId: Long): Boolean
}
