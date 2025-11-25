import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShapeDTO } from '../models/shapedto';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  private apiUrl = "http://localhost:8080"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  draw(shape : ShapeDTO): Observable<ShapeDTO> {
    const url = this.apiUrl + "/draw"
    return this.http.post<ShapeDTO>(url, shape, this.httpOptions)
  }

  copy(shape : ShapeDTO): Observable<ShapeDTO> {
    const url = this.apiUrl + "/copy"
    return this.http.post<ShapeDTO>(url, shape, this.httpOptions)
  }

  delete(shape : ShapeDTO): Observable<ShapeDTO> {
    const url = this.apiUrl + "/delete"
    return this.http.delete<ShapeDTO>(url, {...this.httpOptions, body:shape})
  }

  update(shape : ShapeDTO): Observable<ShapeDTO> {
    const url = this.apiUrl + "/update"
    return this.http.put<ShapeDTO>(url, shape, this.httpOptions)
  }

  undo(): Observable<ShapeDTO[]> {
    const url = this.apiUrl + "/undo"
    return this.http.get<ShapeDTO[]>(url, this.httpOptions)
  }

  redo(): Observable<ShapeDTO[]> {
    const url = this.apiUrl + "/redo"
    return this.http.get<ShapeDTO[]>(url, this.httpOptions)
  }

  //save

  //load
}
