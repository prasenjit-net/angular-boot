package net.prasenjit.poc.angularboot.controller;

import net.prasenjit.poc.angularboot.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 * Created by PRASEN on 3/29/2017.
 */
@RestController
public class UserController {
  @GetMapping("user")
  public User getUser(Principal principal){
    return new User(principal.getName());
  }
}
