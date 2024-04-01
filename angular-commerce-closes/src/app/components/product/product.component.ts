import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input()
  product!:Product;
  @Output()
  productOutPut:EventEmitter<Product>=new EventEmitter();

  constructor(){}

  ngOnInit(){
    this.productOutPut.emit(this.product);
  }

  // 2h12
}
