import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  // private _productService;

  // constructor(productService: ProductService) {
  //   this._productService = productService;
  // }

  // shorthand method
  constructor(private productService: ProductService) {
  }

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ', value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: Product[] = [];

  products: Product[] = [];

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: Product) => 
      product.productName.toLowerCase().includes(filterBy));
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: e => this.errorMessage = e
    });
    
    this.listFilter = 'cart';
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List: ${message}`;
  }
}
