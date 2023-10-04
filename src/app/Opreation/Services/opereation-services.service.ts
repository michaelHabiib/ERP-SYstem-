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

}
