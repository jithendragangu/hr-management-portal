import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService, Employee, Project } from '../app.service';
// import { Employee, Project } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public employeeForm: FormGroup;
  employee!: Employee;
  employeeList: Employee[] = [];
  projectList: Project[] = [];
  createOrder: boolean = false;
  trackOrder: boolean = false;
  isAdmin: boolean = false;

  constructor(private appService: AppService, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: [''],
      email: [''],
      phoneNumber: [''],
      address: [''],
      dateOfBirth: [''],
      hireDate: [''],
      position: [''],
      departmentId: [''],
    });
  }

  ngOnInit(): void {
    this.employee = this.appService.getEmployee() as Employee;
    // console.log('class' + this.employee);
    this.isAdmin = this.employee.position === 'ADMIN';

    if (this.isAdmin) {
      this.getAllEmployees();
      this.getAllProjects();
    } else {
      this.getEmployeeDetails();
      this.getEmployeeProjects();
    }
  }

  getAllEmployees() {
    this.appService.getEmployees().subscribe((data) => {
      this.employeeList = data;
    });
  }

  getAllProjects() {
    this.appService.getProjects().subscribe((data) => {
      console.log(data);
      this.projectList = data;
    });
  }

  getEmployeeDetails() {
    this.employeeForm.patchValue(this.employee);
  }

  getEmployeeProjects() {
    this.appService
      .getProjectsByEmployeeId(this.employee.id)
      .subscribe((data) => {
        this.projectList = data;
      });
  }

  logout() {
    this.appService.logout();
  }
}
