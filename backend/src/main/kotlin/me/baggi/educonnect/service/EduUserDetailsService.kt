package me.baggi.educonnect.service

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class EduUserDetailsService(
    private val userService: UserService
) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val data = userService.findUserByEmail(username)
            ?: throw UsernameNotFoundException("User not found with email: $username")
        return User(
            data.email, data.password, listOf(SimpleGrantedAuthority(data.role.name)),
        )
    }
}