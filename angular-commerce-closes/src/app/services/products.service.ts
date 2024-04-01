import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationsParams, Products } from '../../types';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private apiService:ApiService) { }

  getProducts=(url:string,
    params:PaginationsParams):Observable<Products>=>{
    return this.apiService.get(url,
    { 
      params,
      responseType:"json"
    }  
      );
  }


addProduct=(url:string,body:any):Observable<any>=>{
  return this.apiService.post<any>(url,body,{});
}

editProduct=(url:string,body:any):Observable<any>=>{
  return this.apiService.put<any>(url,body,{});
}
deleteProduct=(url:string):Observable<any>=>{
  return this.apiService.delete<any>(url,{});
}

  
}


//1h22