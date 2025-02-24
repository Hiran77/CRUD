import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../shared/models/Employee';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  isModelOpen = false;
  employees: IEmployee[] = [];
  employee: IEmployee | null = null; // ✅ Fixed potential null reference issue

  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (response) => {
        if (response.data) {
          this.employees = response.data;
        }
      },
      error: (err: HttpErrorResponse) => { // ✅ Added error handling
        this.toastr.error('Failed to load employees: ' + err.message);
      },
    });
  }

  loadEmployee(employee: IEmployee) {
    this.employee = employee;
    this.openModel();
  }

  deleteEmployee(id: string) {
    if (!confirm("Are you sure you want to delete this employee?")) return; // ✅ Added confirmation before delete

    this.employeeService.deleteEmployee(id).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.getAllEmployee();
      },
      error: (err: HttpErrorResponse) => { // ✅ Added error handling
        this.toastr.error('Failed to delete employee: ' + err.message);
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllEmployee();
  }
}
