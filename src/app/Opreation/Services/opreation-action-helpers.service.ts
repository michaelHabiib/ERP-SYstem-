import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpreationActionHelpersService {

  baseUrl = 'https://localhost:7281'

  constructor(private _HttpClient : HttpClient) { }

  // GetAllProjects():Observable<any>{
  //   return this._HttpClient.get(`${this.baseUrl}/api/Operation/Projects/ProjectsGetAll`)
  // }
  GetTypesByGroupType(GroupType : string):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Operation/Types/TypeGetByGroup/${GroupType}`)
  }
  AddNewType(modal : any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/Operation/Types/TypeInsert`,modal)
  }
  GetALlProjects():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/Operation/Projects/ProjectsGetAll`)
  }
  updateProject(id : number, modal : any):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/Operation/Projects/ProjectUpdate/${id}`,modal)
  }
  DeleteProject(id : number): Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/Operation/Projects/ProjectDelete/${id}`)
  }
  addNewProject(modal : any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/Operation/Projects/ProjectInsert`, modal)
  }
  DeleteType(id: number):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}/api/Operation/Types/TypeDelete/${id}`)
  }
  updateType(modal :  any):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/Operation/Types/TypeUpdate`,modal)
  }
}
