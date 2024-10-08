import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import {  ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
  CommonModule,
  DialogModule, 
  FormsModule,
   RatingModule,
   ButtonModule, InputTextModule, AvatarModule
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})


export class EditPopupComponent {

  @Input()
  display:boolean=false;
  @Input()
  header!:string;
  @Output()
  displayChange=new EventEmitter<boolean>()
  @Input()
  product:Product={
    name:"",
    image:"",
    price:"",
    rating: 0,
  };
  
  
  @Output()
  confirm:EventEmitter<Product>=new EventEmitter<any>();
  visible: boolean = false;

  constructor(){}

  onConfirm(){
    this.confirm.emit(this.product);
    this.display=false;
     this.displayChange.emit(this.display)
  }
  
  onCancel(){
   this.display=false;
   this.displayChange.emit(this.display); 
  }


  addProduct(){}


  closeDialog(){
    this.display=false;
    this.displayChange.emit(this.display);
  }
}
