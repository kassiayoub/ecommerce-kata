import { sumOf } from '../utils/number-utils';
import { CartItem } from './cart-item.model';

export class CartItems {
  private readonly _items: Map<number, CartItem> = new Map<number, CartItem>();

  addItem(cartItem: CartItem): void {
    const existingCartItem: CartItem | undefined = this._items.get(cartItem.product.id);
    if (existingCartItem !== undefined) {
      existingCartItem.quantity += cartItem.quantity;
    } else {
      this._items.set(cartItem.product.id, cartItem);
    }
  }

  deleteItem(cartItem: CartItem): void {
    this._items.delete(cartItem.product.id);
  }

  get items(): Map<number, CartItem> {
    return this._items;
  }

  get itemsCount(): number {
    return sumOf(Array.from(this._items.values()).map((cartItem: CartItem) => cartItem.quantity));
  }

  get taxAmount(): number {
    return sumOf(Array.from(this._items.values()).map((cartItem: CartItem) => cartItem.taxAmount));
  }

  get afterTaxPrice(): number {
    return sumOf(Array.from(this._items.values()).map((cartItem: CartItem) => cartItem.afterTaxPrice));
  }
}
