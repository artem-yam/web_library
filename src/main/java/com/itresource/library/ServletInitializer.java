package com.itresource.library;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

//@Configuration
//@EnableWebMvc
@ComponentScan("com.itresource.library")
public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(LibraryApplication.class);
	}
	
//	@Bean
//	public InternalResourceViewResolver setupViewResolver() {
//		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
////		resolver.setPrefix("../resources/static/jsp/");
//		resolver.setPrefix("../resources/static/");
//		resolver.setSuffix(".jsp");
//		resolver.setViewClass(JstlView.class);
//
//		return resolver;
//	}

}
