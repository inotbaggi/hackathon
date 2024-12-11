package me.baggi.educonnect.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "vacancy_table")
data class Vacancy(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "vacancy_title")
    val title: String,
    @Column(name = "vacancy_wage")
    val wage: String,
    @Transient
    @Column(name = "vacancy_tags")
    val tags: List<String>,
    @Column(name = "vacancy_position")
    val position: String,
    @Column(name = "vacancy_description")
    val description: String,

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val user: User
)