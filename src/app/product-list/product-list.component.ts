import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartItem } from '../shared/model/cart-item.model';
import { CartItems } from '../shared/model/cart-items.model';
import { Product } from '../shared/model/product.model';
import { CartService } from '../shared/service/cart.service';
import { ProductService } from '../shared/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = []
  categories: Set<any> = new Set<any>();
  filterByCategoryFormGroup: FormGroup;
  cartItemsCount$: Observable<number>;

  constructor(
    private readonly productService: ProductService,
    private readonly fb: FormBuilder,
    private readonly cartService: CartService
  ) {
    this.filterByCategoryFormGroup = this.fb.group({ category: [''] });
    this.cartItemsCount$ = this.cartService.cartItemsCount$;
  }
  ngOnInit(): void {
    this.initProductCategories();
    this.initProducts();
  }


  private initProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.updateProductsQuantities();
    })
  }

  private initProductCategories() {
    this.productService.getProductCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private updateProductsQuantities() {
    this.cartService.cartItems$.subscribe((cartItems: CartItems) => {
      cartItems.items.forEach(cartItem => {
        const product: Product | undefined = this.findProductById(cartItem);
        if(product != undefined){
          product.quantity -= cartItem.quantity;
        }
      })
    }).unsubscribe();
  }

  private findProductById(cartItem: CartItem): Product | undefined {
    return this.products.find(product => cartItem.product.id == product.id);
  }

  onSelectCategory() {
    const selectedCategory = this.filterByCategoryFormGroup.controls['category']?.value;
    if (selectedCategory != null) {
      this.filterProductsByCategory(selectedCategory);
    } else {
      this.initProducts();
    }
  }

  private filterProductsByCategory(selectedCategory: any) {
    this.productService.getProductsByCategory(selectedCategory).subscribe(products => {
      this.products = products;
      this.updateProductsQuantities();
    });
  }

  addToCart(cartItem: CartItem) {
    this.cartService.addItem(cartItem);
    cartItem.product.quantity -= cartItem.quantity;
  }

}
