package fullstack.project.demo.fullstack.Service;

import fullstack.project.demo.fullstack.ExceptionHandling.EmployeeNotFoundException;
import fullstack.project.demo.fullstack.Model.Employee;
import fullstack.project.demo.fullstack.Repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeService.class);
    private final EmployeeRepository repository;

    @Autowired
    EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        logger.info("Fetching all employees");
        return repository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        logger.info("Fetching employee with id: {}", id);
        return repository.findById(id).orElseThrow(() -> {
            logger.error("Employee with id: {} not found", id);
            return new EmployeeNotFoundException("Employee not found");
        });
    }

    public Employee saveEmployee(Employee employee) {
        logger.info("Saving employee: {}", employee);
        return repository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        logger.info("Updating employee with id: {}", id);
        Employee employee = repository.findById(id).orElseThrow(() -> {
            logger.error("Employee with id: {} not found", id);
            return new EmployeeNotFoundException("Employee not found");
        });
        employee.setName(updatedEmployee.getName());
        employee.setRole(updatedEmployee.getRole());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setPhone(updatedEmployee.getPhone());
        return repository.save(employee);
    }
    public void deleteEmployee(Long id) {
        logger.info("Deleting employee with id: {}", id);
        if (!repository.existsById(id)) {
            logger.error("Employee with id: {} not found", id);
            throw new EmployeeNotFoundException("Employee not found");
        }
        repository.deleteById(id);
    }
}