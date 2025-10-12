

package com.example.springapp.config;

import static com.example.springapp.utils.MyConstant.JWT_BEARER_FORMAT;
import static com.example.springapp.utils.MyConstant.JWT_SERVER_URL;
import static com.example.springapp.utils.MyConstant.JWT_DESCRIPTION;
import static com.example.springapp.utils.MyConstant.JWT_SCHEME;
import static com.example.springapp.utils.MyConstant.JWT_SECURITY_SCHEME_NAME;
import static io.swagger.v3.oas.models.security.SecurityScheme.Type.HTTP;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerApiConfig {

    @Bean
    OpenAPI openAPI() {
        return new OpenAPI()
                .openapi("3.0.1")
                .info(new Info()
                        .title("JWT Authentication API")
                        .version("1.1.2")
                        .description("API for JWT-based authentication and user management")
                        .contact(new io.swagger.v3.oas.models.info.Contact()
                                .name("ANBARASU AN")
                                .email("allsmart.org@gmail.com")))
                .servers(List.of(new Server().url(JWT_SERVER_URL).description("API Server")))
                .addSecurityItem(new SecurityRequirement().addList(JWT_SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(
                                JWT_SECURITY_SCHEME_NAME, new SecurityScheme()
                                        .name(JWT_SECURITY_SCHEME_NAME)
                                        .type(HTTP)
                                        .scheme(JWT_SCHEME)
                                        .description(JWT_DESCRIPTION)
                                        .bearerFormat(JWT_BEARER_FORMAT)));
    }
}


/* 

package com.example.springapp.config;



import static com.example.springapp.utils.MyConstant.JWT_BEARER_FORMAT;
import static com.example.springapp.utils.MyConstant.JWT_LOCALHOST_URL;
import static com.example.springapp.utils.MyConstant.JWT_DESCRIPTION;
import static com.example.springapp.utils.MyConstant.JWT_SCHEME;
import static com.example.springapp.utils.MyConstant.JWT_SECURITY_SCHEME_NAME;
import static io.swagger.v3.oas.models.security.SecurityScheme.Type.HTTP;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerApiConfig  {

    @Bean
        OpenAPI openAPI() {
        return new OpenAPI()
                .openapi("3.0.1") // ✅ Add this line
                .servers(List.of(new Server().url(JWT_LOCALHOST_URL)))
                .addSecurityItem(new SecurityRequirement().addList(JWT_SECURITY_SCHEME_NAME))
                .components(new Components()
                        .addSecuritySchemes(
                                JWT_SECURITY_SCHEME_NAME, new SecurityScheme()
                                        .name(JWT_SECURITY_SCHEME_NAME)
                                        .type(HTTP)
                                        .scheme(JWT_SCHEME)
                                        .description(JWT_DESCRIPTION)
                                        .bearerFormat(JWT_BEARER_FORMAT)
                        )
                );
        }

}


/*
 * 
 */