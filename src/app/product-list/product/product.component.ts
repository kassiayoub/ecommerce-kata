import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../../shared/model/cart-item.model';
import { Product } from '../../shared/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product;
  @Output() addToCartEventEmitter: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  addToCartFormGroup: FormGroup

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.addToCartFormGroup = this.fb.group({ quantity: [1, [Validators.required]] })
  }

  addToCart(event: MouseEvent) {
    event.preventDefault();
    const selectedQuantity = this.addToCartFormGroup.controls['quantity'].value;
    this.addToCartEventEmitter.emit(new CartItem(this.product, selectedQuantity));
    this.resetQuantitySelected();
  }


  private resetQuantitySelected() {
    this.addToCartFormGroup.controls['quantity'].patchValue(1);
  }
}
