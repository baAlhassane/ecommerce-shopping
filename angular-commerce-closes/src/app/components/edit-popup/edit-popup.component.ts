import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
  CommonModule,DialogModule
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {

  @Input()
  display:boolean=false;
  @Output()
  confirm:EventEmitter<Product>=new EventEmitter();
 

  @Input()
  product:Product={
    name:"",
    image:"",
    price:"",
    rating:"",
  }
  constructor(){}

  onConfirm(){
    this.confirm.emit(this.product);
  }
  
  onCancel(){
   this.display=false;
  }
}
