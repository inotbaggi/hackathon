package me.baggi.educonnect.controller

import me.baggi.educonnect.model.Role
import me.baggi.educonnect.model.Vacancy
import me.baggi.educonnect.model.dto.VacancyRequest
import me.baggi.educonnect.service.VacancyService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/vacancies")
class VacancyController(private val vacancyService: VacancyService) {

    @GetMapping
    fun getAllVacancies(): ResponseEntity<List<Vacancy>> {
        return ResponseEntity.ok(vacancyService.getAllVacancies())
    }

    @GetMapping("/{id}")
    fun getVacancyById(@PathVariable id: Long): ResponseEntity<Vacancy> {
        return ResponseEntity.ok(vacancyService.getVacancyById(id))
    }

    @PostMapping
    //@PreAuthorize("hasAnyAuthority('EMPLOYER')")
    fun createVacancy(@RequestBody vacancy: VacancyRequest.Create): ResponseEntity<Vacancy> {
        return ResponseEntity.status(HttpStatus.CREATED).body(vacancyService.createVacancy(vacancy))
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYER')")
    fun updateVacancy(
        @PathVariable id: Long,
        @RequestBody updatedVacancy: Vacancy
    ): ResponseEntity<Vacancy> {
        return ResponseEntity.ok(vacancyService.updateVacancy(id, updatedVacancy))
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('EMPLOYER')")
    fun deleteVacancy(@PathVariable id: Long): ResponseEntity<Void> {
        vacancyService.deleteVacancy(id)
        return ResponseEntity.noContent().build()
    }
}
