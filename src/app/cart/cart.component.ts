import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItems } from '../shared/model/cart-items.model';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/service/cart.service';
import { CartItem } from '../shared/model/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItems = new CartItems();
  private readonly cartItemsSubscription$: Subscription = new Subscription();

  constructor(private readonly cartService: CartService) { }

  ngOnInit(): void {
    this.initCartItems();
  }

  private initCartItems(): void {
    this.cartService.cartItems$.subscribe((cartItems: CartItems) => (this.cartItems = cartItems));
  }

  ngOnDestroy(): void {
    this.cartItemsSubscription$.unsubscribe();
  }

  deleteItem(cartItem: CartItem) {
    this.cartService.deleteItem(cartItem);
  }

}
