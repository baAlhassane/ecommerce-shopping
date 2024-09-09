import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products,Product } from '../../../types';
import { ProductComponent } from "../product/product.component";
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from "../edit-popup/edit-popup.component";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule
]
})
export class HomeComponent {

  products:Product[]=[];
  totalRecords:number=0;
  rows:number=5;
 static  num:number=0;

  apiUrl:string="http://localhost:3000/clothes";

  displayEditPopup:boolean=false;
  displayAddPopup:boolean=false;

  selectedProduct:Product={
    id:0,
    name:"",
    image:"",
    price:"",
    rating: 0

  }

  @ViewChild("paginator")paginator:Paginator | undefined;

  
  toggleEditPopup(product:Product){
    this.selectedProduct=product;
    this.displayEditPopup= true;
  }


  
  toggleDeletePopup(product:Product){
    if(!product.id){
      return
     
    }
  
    const id:number=product.id;
    this.deleteProduct(product.id);
  }


  toggleAddPopup(){
   // this.displayEditPopup= true;
     this.displayAddPopup= true;
  }
  onConfirmEdit(product:Product){
    if(!this.selectedProduct.id){
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup=false;
  }
  onConfirmAdd(product:Product){
    this.addProduct(product);
    this.displayAddPopup=false;
  }
constructor(private productService:ProductsService){}

ngOnInit(){
  this.fetchProduct(0,this.rows);
}

onProductOutput(product:Product){
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
 resetPaginator(){
  this.paginator?.changePage(0);
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
deleteProduct(id:number){
  this.productService.deleteProduct(this.apiUrl+"/"+`${id}`)
  .subscribe(
    {
      next:(product:Product)=>{
        this.fetchProduct(0,this.rows);
        this.resetPaginator();
        console.log(product)
      },
      error:(error)=>{ 
      console.log(error)
      }
    }

  )


 // console.log(" delete ",product);
}


addProduct(product:Product){
  this.productService.addProduct(this.apiUrl,product)
  .subscribe(
    {
      next:(product:Product)=>{
        this.fetchProduct(0,this.rows);
        console.log(product);
        this.resetPaginator();
      },
      error:(error)=>{ 
      console.log(error)
      }
    }

  )

  console.log(" add ", product);
}

}
