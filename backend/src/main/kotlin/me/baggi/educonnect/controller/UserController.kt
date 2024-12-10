package me.baggi.educonnect.controller

import me.baggi.educonnect.model.User
import me.baggi.educonnect.model.dto.UserDTO
import me.baggi.educonnect.model.dto.toDTO
import me.baggi.educonnect.service.UserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/users")
class UserController(
    private val userService: UserService
) {
    @GetMapping("/{id}")
    fun getUser(@PathVariable("id") id: Long): UserDTO? {
        return userService.getUserById(id)?.toDTO()
    }
}