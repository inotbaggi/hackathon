package me.baggi.educonnect.model.dto

sealed class VacancyResponse {
    data class DTO(
        val id: Long,
        val title: String,
        val wage: String,
        val position: String,
        val description: String,
        val ownerCompany: String,
        val owner: String
    )
}
