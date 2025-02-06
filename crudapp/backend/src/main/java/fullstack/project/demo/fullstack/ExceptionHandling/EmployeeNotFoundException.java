package fullstack.project.demo.fullstack.ExceptionHandling;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(String message) {
        super(message);
    }
}