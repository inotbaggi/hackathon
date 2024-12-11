package me.baggi.educonnect.service

import jakarta.persistence.EntityNotFoundException
import me.baggi.educonnect.model.Lesson
import me.baggi.educonnect.model.dto.LessonRequest
import me.baggi.educonnect.repository.CourseRepository
import me.baggi.educonnect.repository.LessonRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class LessonService(
    private val lessonRepository: LessonRepository,
    private val courseRepository: CourseRepository
) {
    fun createLesson(lessonRequest: LessonRequest.Create, courseId: Long): Lesson {
        val course = courseRepository.findByIdOrNull(courseId)
            ?: throw EntityNotFoundException("Course not found")

        val lesson = Lesson(
            title = lessonRequest.title,
            videoUrl = lessonRequest.videoUrl,
            description = lessonRequest.description,
            course = course
        )
        return lessonRepository.save(lesson)
    }

    fun getLessonsForCourse(courseId: Long): List<Lesson> =
        lessonRepository.findByCourseId(courseId)
}
