/*package fullstack.project.demo.fullstack.Service;

import fullstack.project.demo.fullstack.DTO.SignupRequest;
import fullstack.project.demo.fullstack.Model.Employee;
import fullstack.project.demo.fullstack.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Employee registerUser(SignupRequest signupRequest) {
        Employee emp = new Employee();
        emp.setName(signupRequest.getUsername());
        emp.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        emp.setEmail(signupRequest.getEmail());
        return employeeRepository.save(emp);
    }
}*/