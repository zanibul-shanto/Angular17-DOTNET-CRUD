import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './Interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "https://localhost:7278";
  
  http = inject(HttpClient);

  constructor() { }

  getAllEmployee(){
    return this.http.get<IEmployee[]>(this.apiUrl+"/api/Employee");
  }
  creteEmployee(employee:IEmployee){
    return this.http.post(this.apiUrl+"/api/Employee",employee);
  }
  getEmployeeById(employeeId:Number){
    return this.http.get<IEmployee>(this.apiUrl+"/api/Employee/"+employeeId);
  }
  updateEmployee(employeeId:Number, employee:IEmployee){
    return this.http.put<IEmployee>(this.apiUrl+"/api/Employee/"+employeeId,employee);
  }
  deleteEmployeeById(employeeId:Number){
    return this.http.delete(this.apiUrl+"/api/Employee/"+employeeId);
  }
}
