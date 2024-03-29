import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products,Product } from '../../../types';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductComponent,CommonModule]
})
export class HomeComponent {

  products:Product[]=[];
constructor(private productService:ProductsService){}

ngOnInit(){
  this.productService.getProducts("http://localhost:3000/clothes",{page:0,perPage:5}).subscribe(
    (products:Products)=>this.products=products.items//console.log(products.items)
  )
}
}
