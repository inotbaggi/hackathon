package me.baggi.educonnect.service

import jakarta.persistence.EntityNotFoundException
import me.baggi.educonnect.model.User
import me.baggi.educonnect.model.Vacancy
import me.baggi.educonnect.model.dto.VacancyRequest
import me.baggi.educonnect.model.dto.VacancyResponse
import me.baggi.educonnect.repository.VacancyRepository
import org.springframework.stereotype.Service

@Service
class VacancyService(
    private val vacancyRepository: VacancyRepository,
    private val userService: UserService
) {
    fun getAllVacancies(): List<Vacancy> = vacancyRepository.findAll()

    fun getVacanciesByUser(user: User): List<Vacancy> = vacancyRepository.findByUser(user)

    fun getVacancyById(id: Long): Vacancy =
        vacancyRepository.findById(id).orElseThrow {
            EntityNotFoundException("Vacancy with id $id not found")
        }

    fun createVacancy(vacancy: VacancyRequest.Create): Vacancy {
        val owner = userService.getUserById(vacancy.owner) ?: throw EntityNotFoundException("User ${vacancy.owner} not found")
        val data = Vacancy(
            title = vacancy.title,
            description = vacancy.description,
            wage = vacancy.wage,
            tags = vacancy.tags,
            position = vacancy.position,
            user = owner
        )
        vacancyRepository.save(
            data
        )
        return data
    }

    fun updateVacancy(id: Long, updatedVacancy: Vacancy): Vacancy {
        val existingVacancy = getVacancyById(id)
        return vacancyRepository.save(
            existingVacancy.copy(
                title = updatedVacancy.title,
                wage = updatedVacancy.wage,
                tags = updatedVacancy.tags,
                position = updatedVacancy.position,
                description = updatedVacancy.description
            )
        )
    }

    fun deleteVacancy(id: Long) = vacancyRepository.deleteById(id)
}
