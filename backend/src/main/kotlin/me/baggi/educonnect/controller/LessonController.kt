package me.baggi.educonnect.controller

import me.baggi.educonnect.model.Lesson
import me.baggi.educonnect.model.dto.LessonRequest
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
@RequestMapping("/api/lessons")
class LessonController(private val lessonService: LessonService) {
    @PostMapping
    fun createLesson(
        @RequestBody lessonRequest: LessonRequest.Create,
        @RequestParam courseId: Long
    ): ResponseEntity<Lesson> {
        val lesson = lessonService.createLesson(lessonRequest, courseId)
        return ResponseEntity.status(HttpStatus.CREATED).body(lesson)
    }

    @GetMapping("/{courseId}")
    fun getLessonsForCourse(@PathVariable courseId: Long): List<Lesson> {
        return lessonService.getLessonsForCourse(courseId)
    }
}
