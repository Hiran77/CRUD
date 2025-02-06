package fullstack.project.demo.fullstack.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {

    @NotBlank(message = "Username is mandatory")
    @Size(min = 2, max = 100, message = "Username must be between 2 and 100 characters")
    private String username;

    @NotBlank(message = "Password is mandatory")
    private String password;

    @Email(message = "Email should be valid")
    private String email;
}