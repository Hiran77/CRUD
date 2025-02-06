/*package fullstack.project.demo.fullstack.Controller;

import fullstack.project.demo.fullstack.DTO.SignupRequest;
import fullstack.project.demo.fullstack.Model.Employee;
import fullstack.project.demo.fullstack.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<Employee> signup(@Valid @RequestBody SignupRequest signupRequest) {
        Employee employee= userService.registerUser(signupRequest);
        return ResponseEntity.ok(employee);
    }
}*/