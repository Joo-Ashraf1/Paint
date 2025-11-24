import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShapeDTO } from '../models/shapedto';

@Injectable({
  providedIn: 'root',
})
export class ShapeService {
  private apiUrl = "https://webhook.site/016a2250-582c-46e8-8da6-79244792a807"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  draw(shape : ShapeDTO): Observable<ShapeDTO> {
    return this.http.post<ShapeDTO>(this.apiUrl, shape, this.httpOptions)
  }
}
