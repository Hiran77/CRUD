import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, IEmployee } from '../pages/shared/models/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiurl = 'http://localhost:8080/api/employees';

  // ✅ Define HTTP Headers
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // ✅ Get All Employees
  getAllEmployee(): Observable<ApiResponse<IEmployee[]>> {
    return this.http.get<ApiResponse<IEmployee[]>>(this.apiurl, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Get Employee by ID
  getEmployee(id: string): Observable<ApiResponse<IEmployee>> {
    return this.http.get<ApiResponse<IEmployee>>(`${this.apiurl}/${id}`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Create Employee
  createEmployee(employee: IEmployee): Observable<any> {
    return this.http.post(`${this.apiurl}`, employee, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Update Employee
  updateEmployee(id: string, employee: IEmployee): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, employee, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Delete Employee
  deleteEmployee(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Error Handling
  private handleError(error: HttpErrorResponse) {
    console.error(`Backend returned error ${error.status}: ${error.message}`);
    return throwError(() => new Error('Something went wrong! Please try again.'));
  }
}
