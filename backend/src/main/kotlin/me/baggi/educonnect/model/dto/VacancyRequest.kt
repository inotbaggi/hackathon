package me.baggi.educonnect.model.dto

sealed class VacancyRequest {
    data class Create(
        val owner: Long,
        val title: String,
        val wage: String,
        val tags: List<String>,
        val position: String,
        val description: String,
    )
}