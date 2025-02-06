import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IEmployee } from '../shared/models/Employee';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnChanges {
  @Input() data: IEmployee | null = null;
  @Output() onCloseModel = new EventEmitter();

  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {
    // Updated Form (Removed dob, doj, and changed mobile → phone)
    this.employeeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]), // Changed from mobile
      role: new FormControl('', [Validators.required]), // Added role
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.employeeForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        phone: this.data.phone, // Changed from mobile
        role: this.data.role,   // Added role
      });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData = {
        name: this.employeeForm.value.name,
        email: this.employeeForm.value.email,
        phone: this.employeeForm.value.phone,
        role: this.employeeForm.value.role,
      };

      if (this.data) {
        this.employeeService.updateEmployee(this.data._id as string, employeeData).subscribe({
          next: (response: any) => {
            this.resetEmployeeForm();
            this.toastr.success(response.message);
          },
          error: (err) => {
            this.toastr.error('Failed to update employee: ' + err.message);
          }
        });
      } else {
        this.employeeService.createEmployee(employeeData).subscribe({
          next: (response: any) => {
            this.resetEmployeeForm();
            this.toastr.success(response.message);
          },
          error: (err) => {
            this.toastr.error('Failed to create employee: ' + err.message);
          }
        });
      }
    } else {
      this.toastr.error('Please fill out all required fields');
    }
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
    this.onClose();
  }
}
