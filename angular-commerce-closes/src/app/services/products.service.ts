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

  getProducts=(url:string,params:PaginationsParams):Observable<Products>=>{
    return this.apiService.get(url,
    { 
      params,
      responseType:"json"
    }  
      );
  }


}


//1h22