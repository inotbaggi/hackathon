package me.baggi.educonnect.model.dto

sealed class CourseRequest {
    data class Create(
        val title: String,
        val description: String
    )
}

sealed class LessonRequest {
    data class Create(
        val title: String,
        val videoUrl: String,
        val description: String
    )
}
