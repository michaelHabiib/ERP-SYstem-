import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegsterAndLoginService {

  baseUrl = 'https://localhost:7281'

  constructor(private _HttpClient : HttpClient) { }

  UserInsert(modal : any):Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/SecurityBMD/Users/UserInsert`,modal)
  }
  GetAllRoles():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/SecurityBMD/Roles/RolesGetAll`)
  }
  LogIn(modal : any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/SecurityBMD/Users/UserLogin?username1=${modal.username}&password=${modal.password}`)
  }
  verfctionCode(modal : any):Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/api/SecurityBMD/UserAuthByEmails/UserAuthByEmailSelectByUsersID30min?UserName=${modal.username}&OneTimeCode=${modal.code}`)
  }
}
