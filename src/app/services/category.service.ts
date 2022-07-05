import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>('http://localhost:3000/categories');
  }

  PostCategory(data:any) {
    return this.http.post<any>('http://localhost:3000/categories/',data); 
  }

}
