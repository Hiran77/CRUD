package fullstack.project.demo.fullstack.Repository;

import fullstack.project.demo.fullstack.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}

