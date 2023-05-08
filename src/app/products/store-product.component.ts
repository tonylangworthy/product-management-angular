import { Component } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.css']
})
export class StoreProductComponent {

  constructor(private productService: ProductService) {
  }

  saveProduct(): void {
    console.log('Product Saved!')
  }
}
