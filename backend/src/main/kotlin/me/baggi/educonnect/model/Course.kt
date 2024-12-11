package me.baggi.educonnect.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import jakarta.persistence.Transient

@Entity
@Table(name = "course_table")
data class Course(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(name = "course_title")
    val title: String,
    @Transient
    @Column(name = "course_tags")
    val tags: List<String>,
    @Column(name = "vacancy_description")
    val description: String,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    val owner: User
)