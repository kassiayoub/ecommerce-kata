import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Product, ProductCategory } from '../model/product.model';
import { CartItem } from '../model/cart-item.model';
import { CartItems } from '../model/cart-items.model';
import spyOn = jest.spyOn;


describe('CartService', () => {
  let service: CartService;

  const PRODUCT_1: Product = new Product(1, 'P1', 10, 20, false, ProductCategory.ELECTRIC, []);
  const CART_ITEM_1: CartItem = new CartItem(PRODUCT_1, 10);
  const PRODUCT_2: Product = new Product(2, 'P2', 10, 20, false, ProductCategory.ELECTRIC, []);
  const CART_ITEM_2: CartItem = new CartItem(PRODUCT_2, 10);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    // Given
    const cartItems: CartItems = new CartItems();
    cartItems.addItem(CART_ITEM_1);
    spyOn(service.cartItems$, 'next');
    spyOn(service.cartItemsCount$, 'next');

    // When
    service.addItem(CART_ITEM_1);

    // Then
    expect(service.cartItems$.next).toHaveBeenCalledTimes(1);
    expect(service.cartItems$.next).toHaveBeenCalledWith(cartItems);

    expect(service.cartItemsCount$.next).toHaveBeenCalledTimes(1);
    expect(service.cartItemsCount$.next).toHaveBeenCalledWith(cartItems.itemsCount);
  });

  it('should delete item from cart', () => {
    // Given
    const cartItems: CartItems = new CartItems();
    cartItems.addItem(CART_ITEM_1);

    service.addItem(CART_ITEM_1);
    service.addItem(CART_ITEM_2);

    spyOn(service.cartItems$, 'next');
    spyOn(service.cartItemsCount$, 'next');

    // When
    service.deleteItem(CART_ITEM_2);

    // Then
    expect(service.cartItems$.next).toHaveBeenCalledTimes(1);
    expect(service.cartItems$.next).toHaveBeenCalledWith(cartItems);

    expect(service.cartItemsCount$.next).toHaveBeenCalledTimes(1);
    expect(service.cartItemsCount$.next).toHaveBeenCalledWith(cartItems.itemsCount);
  });
});
