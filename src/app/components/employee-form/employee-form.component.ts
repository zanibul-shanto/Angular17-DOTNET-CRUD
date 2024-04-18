import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../Interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})

export class EmployeeFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  employeeForm=this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required]],
    age:[0,[Validators.required]],
    phone:['',[Validators.required]],
    salary:[0,[Validators.required]]
  })

  employeeId!:number;
  isEdit = false;

  ngOnInit(){
    this.employeeId=this.route.snapshot.params['id'];
    if(this.employeeId){
      this.isEdit= true;
      this.httpService.getEmployeeById(this.employeeId).subscribe(result=>{
        console.log(result);
        this.employeeForm.patchValue(result);
      })
    }
  }
  
  save(){
    console.log(this.employeeForm.value);
    const employee :IEmployee={
      name:this.employeeForm.value.name!,
      age: this.employeeForm.value.age!,
      salary:this.employeeForm.value.salary!,
      email:this.employeeForm.value.email!,
      phone:this.employeeForm.value.phone!,
    }
    if(this.isEdit){
      this.httpService.updateEmployee(this.employeeId,employee).subscribe(result=>{
        console.log(result);
        this.employeeForm.patchValue(result);
      })
    }
    else{
      this.httpService.creteEmployee(employee).subscribe(()=>{
        console.log("Success");
        this.router.navigateByUrl("/employee-list");
      });
    }
  }

}
