package net.prasenjit.poc.angularboot;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;

/**
 * Created by PRASEN on 3/28/2017.
 */
@Configuration
@Order(value = SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.httpBasic()
      .authenticationEntryPoint(authEntry()).and().formLogin().loginPage("/")
      .and().csrf().disable()
//      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
      .logout().logoutSuccessHandler((request, response, authentication) -> response.setStatus(200)).and()
      .authorizeRequests()
      .antMatchers("/", "/*.js", "/*.ttf","/*.woff","/*.woff2","/*.svg").permitAll()
      .anyRequest().fullyAuthenticated();
  }

  private AuthenticationEntryPoint authEntry() {
    return ((request, response, authException) -> response.sendError(401, "Full authentication is required to access"));
  }
}
