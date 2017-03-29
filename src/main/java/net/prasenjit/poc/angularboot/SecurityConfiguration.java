package net.prasenjit.poc.angularboot;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by PRASEN on 3/28/2017.
 */
@Configuration
@Order(value = SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.httpBasic().and().formLogin().loginPage("/")
      .and().csrf().disable()
      .authorizeRequests()
      .antMatchers("/", "/*.js", "/*.ttf","/*.woff","/*.woff2","/*.svg").permitAll()
      .anyRequest().fullyAuthenticated();
  }
}
