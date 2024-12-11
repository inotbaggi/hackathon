package me.baggi.educonnect.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import jakarta.persistence.Transient
import java.time.LocalDateTime

@Entity
@Table(name = "courses")
data class Course(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val description: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    val teacher: User,

    @OneToMany(mappedBy = "course", cascade = [CascadeType.ALL], orphanRemoval = true)
    val lessons: List<Lesson> = mutableListOf()
)

@Entity
@Table(name = "lessons")
data class Lesson(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val title: String,

    @Column(nullable = false)
    val videoUrl: String, // Ссылка на YouTube

    @Column(nullable = false, columnDefinition = "TEXT")
    val description: String, // Текстовое описание

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    val course: Course,

    @OneToMany(mappedBy = "lesson", cascade = [CascadeType.ALL], orphanRemoval = true)
    val questions: List<Question> = mutableListOf()
)

@Entity
@Table(name = "questions")
data class Question(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val text: String, // Текст вопроса

    @ElementCollection
    @CollectionTable(name = "answers", joinColumns = [JoinColumn(name = "question_id")])
    @MapKeyColumn(name = "answer_text") // Текст ответа
    @Column(name = "is_correct") // Правильность ответа
    val answers: Map<String, Boolean> = mapOf(),

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    val lesson: Lesson
)

@Entity
@Table(name = "completed_courses")
data class CompletedCourse(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    val course: Course,

    @Column(name = "completion_date", nullable = false)
    val completionDate: LocalDateTime = LocalDateTime.now()
)
