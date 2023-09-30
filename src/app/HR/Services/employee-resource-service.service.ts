import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeResourceServiceService {
  baseUrl = 'https://localhost:7281'

  constructor(private _HttpClient : HttpClient ) { }

  GetAllJopId():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/HR/Jobs/Get`)
  }
  GetAllDepartmentId():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/HR/Departments/Get?SortColumn=Lastname&SortOrder=ASC`)
  }
  GetAllBranchId():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Global/Branches/Get`)
  }

}
