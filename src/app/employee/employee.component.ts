import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  public employeeForm: FormGroup; //

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    // Initialize employee form group
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

  submitEmployee() {
    this.appService
      .createEmployee(this.employeeForm.value)
      .subscribe((data) => {
        if (data.status == 200 || data.status == 201) {
          alert('Employee Created Successfully');
          this.employeeForm.reset();
          // Optionally, navigate to employee list or another page
        } else {
          alert('Failed to create employee');
        }
      });
  }
}
