package me.baggi.educonnect.gateway

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.cloud.gateway.route.RouteLocator
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@SpringBootApplication
@EnableDiscoveryClient
@Configuration
class GatewayApplication

fun main(args: Array<String>) {
	runApplication<GatewayApplication>(*args)
}

@Bean
fun customRouteLocator(builder: RouteLocatorBuilder): RouteLocator {
	return builder.routes()
		.route("user-service") {
			it.path("/user/**")
				.uri("lb://user-service")
		}
		.route("course-service") {
			it.path("/course/**")
				.uri("lb://course-service")
		}
		.route("personalization-service") {
			it.path("/personalization/**")
				.uri("lb://personalization-service")
		}
		.route("webinar-service") {
			it.path("/webinar/**")
				.uri("lb://webinar-service")
		}
		.route("work-service") {
			it.path("/work/**")
				.uri("lb://work-service")
		}
		.build()
}