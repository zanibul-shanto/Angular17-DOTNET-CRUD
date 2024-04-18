import { Component, inject } from '@angular/core';
import { IEmployee } from '../../Interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent {
  employeeList: IEmployee[]=[];
  displayedColumns: string[] = ['Id', 'Name', 'Email', 'Phone', 'Age', 'Salary', 'Action'];

  httpService = inject(HttpService);
  router = inject(Router);

  ngOnInit(){
    this.getEmployeeList();
  }
  getEmployeeList(){
    this.httpService.getAllEmployee().subscribe(result => {
      this.employeeList = result;
      console.log(this.employeeList)
    });
  }
  edit(id:Number){
    console.log(id);
    this.router.navigateByUrl("/employee/"+id);
  }
  delete(id:Number){
    console.log(id);
    this.httpService.deleteEmployeeById(id).subscribe(()=>{
      console.log("Deleted");
      //this.employeeList=this.employeeList.filter(x=>x.id!=id);
      this.getEmployeeList();
    });
  }
}