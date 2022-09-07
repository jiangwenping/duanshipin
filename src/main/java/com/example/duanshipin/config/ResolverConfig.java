package com.example.duanshipin.config;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * @author wenping
 */
@Component
public class ResolverConfig {
    @Bean
    public InternalResourceViewResolver htmlViewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/static/");
        viewResolver.setSuffix(".html");
        viewResolver.setOrder(0);
        viewResolver.setViewNames("/vue-admin/**");
        return viewResolver;
    }

}
