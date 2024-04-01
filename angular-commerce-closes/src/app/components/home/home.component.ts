import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products,Product } from '../../../types';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
      ProductComponent,
      CommonModule,
      PaginatorModule
    ]
})
export class HomeComponent {

  products:Product[]=[];
  totalRecords:number=0;
  rows:number=5;
 static  num:number=0;
  apiUrl:string="http://localhost:3000/clothes";
constructor(private productService:ProductsService){

}

ngOnInit(){
  this.fetchProduct(0,this.rows);
}

onProductOutPut(product:Product){
  // let num1=this.num+1;
  let num1=HomeComponent.num++;
  console.log("onProductOutPut() "+num1,product);
}

fetchProduct(page:number,perPage:number){
  this.productService.getProducts("http://localhost:3000/clothes",
  {page:page,perPage:perPage}).subscribe(

    // (products:Products)=>{
    //   this.products=products.items;//console.log(products.items)
    //   this.totalRecords=products.total;
    //   console.log("totalRecords := "+this.totalRecords);
    // }

    {
      next:(products:Products)=>{
        this.products=products.items;
        this.totalRecords=products.total;
        console.log("totalRecords := "+this.totalRecords);
      },
      error:(error)=>{ 
      console.log(error)
      }
    }

  );
}

onPageChange(event:any){
  console.log(" \n");
  console.log(" new fetch : \n");
  console.log(" onchangePage page  := "+event.page, "  onchangePage Perpage := "+event.rows);
  this.fetchProduct(event.page,event.rows);
}

editProduct(product:Product,id:number){
  console.log(" edit ", product);
  this.productService.editProduct(this.apiUrl+"/"+`${id}`,product)
  .subscribe(
    {
      next:(product:Product)=>{
        this.fetchProduct(0,this.rows);
        console.log(product)
      },
      error:(error)=>{ 
      console.log(error)
      }
    }

  )
}
deleteProduct(product:Product,id:number){
  this.productService.deleteProduct(this.apiUrl+"/"+`${id}`)
  .subscribe(
    {
      next:(product:Product)=>{
        this.fetchProduct(0,this.rows);
        console.log(product)
      },
      error:(error)=>{ 
      console.log(error)
      }
    }

  )


  console.log(" delete ",product);
}


addProduct(product:Product){
  this.productService.addProduct(this.apiUrl,product)
  .subscribe(
    {
      next:(product:Product)=>{
        this.fetchProduct(0,this.rows);
        console.log(product)
      },
      error:(error)=>{ 
      console.log(error)
      }
    }

  )

  console.log(" add ", product);
}

}
