import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpereationServicesService {

  baseUrl = 'https://localhost:7281'

  constructor(private _HttpClient : HttpClient) { }

  AddNewUnit(modal : {}):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/Operation/Units/UnitInsert`, modal)
  }
  GetAllUnit():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Operation/Units/UnitsGetAll?PageNo=1&PageSize=10&SortColumn=Projectname&SortOrder=ASC&SearchColumn=Projectname`)
  }
  GetUnitByID(id : number):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Operation/Units/UnitGetById/${id}`)
  }
  GetAllProjects():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Operation/Projects/ProjectsGetAll`)
  }
  UpdateUnit(modal : {}, id : number):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/Operation/Units/UnitUpdate/${id}`,modal)
  }
  DeleteUnit(id : number):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/Operation/Units/UnitDelete/${id}`)
  }
}
