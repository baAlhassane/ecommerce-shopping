import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import {  ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import {ConfirmPopupModule} from 'primeng/confirmpopup';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule
  ],
  providers:[ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {

  @ViewChild("deletButton")
  deletButton:any;

  @Input()
  product!:Product;
  @Output()
  edit:EventEmitter<Product>=new EventEmitter();
  @Output()
  delete: EventEmitter<Product>=new EventEmitter();

  constructor(private confirmationService:ConfirmationService){}

  ngOnInit(){}

  confirmDelete(){
    this.confirmationService.confirm(
      {
        target:this.deletButton.nativeElement,
        message: " Are you sure that you want to delete the Product",
        accept: () => {
          this.deleteProduct()
        },
      });
  }


  editProduct(){
    this.edit.emit(this.product);
  }
  deleteProduct(){
    this.delete.emit(this.product);
  }
 
}
