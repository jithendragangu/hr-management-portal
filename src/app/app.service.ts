import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';

const EMPLOYEE_BASE_URL = 'http://localhost:8091/employees'; // Replace with your actual backend URL for employees
const PROJECT_BASE_URL = 'http://localhost:8094/project'; // Replace with your actual backend URL for employees

export interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: Date;
  hireDate: Date;
  position: string;
  departmentId: number;
}
export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  projectManagerId: number;
}
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  createEmployee(requestBody: any) {
    return this.httpClient.post(EMPLOYEE_BASE_URL, requestBody, {
      observe: 'response',
    });
  }

  login(requestBody: any) {
    const headers = new HttpHeaders()
      .set('emailId', requestBody.email)
      .set('password', requestBody.password);
    return this.httpClient.post(
      EMPLOYEE_BASE_URL + '/authenticate',
      {},
      { headers, observe: 'response' }
    );
  }
  // saveEmployee(requestBody: any) {
  //   sessionStorage.setItem('employee', JSON.stringify(requestBody));
  // }
  // getEmployee(): Employee | null {
  //   let employeeData: string | null = sessionStorage.getItem('employee');
  //   console.log(JSON.parse(employeeData!)['employee'] as Employee);
  //   return employeeData
  //     ? (JSON.parse(employeeData)['employee'] as Employee)
  //     : null;
  // }

  saveEmployee(requestBody: any) {
    sessionStorage.setItem('employee', JSON.stringify(requestBody));
  }
  getEmployee(): Employee | null {
    let employeeData: string | null = sessionStorage.getItem('employee');
    return employeeData ? (JSON.parse(employeeData) as Employee) : null;
  }

  getEmployees() {
    return this.httpClient.get<Employee[]>(EMPLOYEE_BASE_URL);
  }

  getProjectsByEmployeeId(employeeId: any) {
    return this.httpClient.get<Project[]>(
      PROJECT_BASE_URL + '/all/' + employeeId
    );
  }

  getProjects() {
    return this.httpClient.get<Project[]>(PROJECT_BASE_URL);
  }
  logout() {
    sessionStorage.removeItem('employee');
    this.router.navigate(['/login']);
  }
  getAllEmployees() {
    return this.httpClient.get<Employee[]>(
      EMPLOYEE_BASE_URL + '/employees/all'
    );
  }
}
