import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    const url = 'https://services.err.ee/api/v2/category/getByUrl?url=video&domain=jupiter.err.ee';
    return this.http.get(url);
  }
}
