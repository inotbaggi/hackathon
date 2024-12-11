package me.baggi.educonnect.repository

import me.baggi.educonnect.model.Vacancy
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface VacancyRepository : JpaRepository<Vacancy, Long> {
}