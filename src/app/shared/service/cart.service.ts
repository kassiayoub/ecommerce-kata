import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { CartItems } from '../model/cart-items.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartItems: CartItems = new CartItems();
  private readonly _cartItemsCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readonly _cartItems$: BehaviorSubject<CartItems> = new BehaviorSubject<CartItems>(this.cartItems);

  addItem(cartItem: CartItem) {
    this.cartItems.addItem(cartItem);
    this._cartItems$.next(this.cartItems);
    this._cartItemsCount$.next(this.cartItems.itemsCount);
  }

  deleteItem(cartItem: CartItem) {
   this.cartItems.deleteItem(cartItem);
   this._cartItems$.next(this.cartItems);
   this._cartItemsCount$.next(this.cartItems.itemsCount);
  }

  get cartItemsCount$(): BehaviorSubject<number> {
    return this._cartItemsCount$;
  }

  get cartItems$(): BehaviorSubject<CartItems> {
    return this._cartItems$;
  }

}
