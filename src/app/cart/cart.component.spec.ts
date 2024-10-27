import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { Product, ProductCategory } from '../shared/model/product.model';
import { CartItem } from '../shared/model/cart-item.model';
import { CartItems } from '../shared/model/cart-items.model';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../shared/service/cart.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  const PRODUCT_1: Product = new Product(1, 'P1', 10, 11, false, ProductCategory.ELECTRIC, [10, 20]);
  const PRODUCT_2: Product = new Product(2, 'P2', 20, 21, true, ProductCategory.FOOD, []);
  const PRODUCT_3: Product = new Product(3, 'P3', 30, 31, true, ProductCategory.PARFUME, [5]);
  const CART_ITEM_1: CartItem = new CartItem(PRODUCT_1, 10);
  const CART_ITEM_2: CartItem = new CartItem(PRODUCT_2, 20);
  const CART_ITEM_3: CartItem = new CartItem(PRODUCT_3, 30);
  const CART_ITEMS: CartItems = new CartItems();
  CART_ITEMS.addItem(CART_ITEM_1);
  CART_ITEMS.addItem(CART_ITEM_2);
  CART_ITEMS.addItem(CART_ITEM_3);

  const CART_SERVICE: any = {};

  beforeEach(async () => {
    jest.clearAllMocks();

    CART_SERVICE.cartItems$ = new BehaviorSubject<CartItems>(new CartItems());
    CART_SERVICE.deleteItem = jest.fn();

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: CART_SERVICE }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items on loading', fakeAsync(() => {
    // Given
    component.cartItems = new CartItems();
    CART_SERVICE.cartItems$.next(CART_ITEMS);

    // When
    component.ngOnInit();

    // Then
    expect(component.cartItems).toEqual(CART_ITEMS);
  }));

  it('should refresh cart items when receiving new cart items stream', fakeAsync(() => {
    // Given
    component.cartItems = new CartItems();

    // When
    component.ngOnInit();
    CART_SERVICE.cartItems$.next(CART_ITEMS);

    // Then
    expect(component.cartItems).toEqual(CART_ITEMS);
  }));

  it('should delete cart item', fakeAsync(() => {
    // When
    component.deleteItem(CART_ITEM_1);

    // Then
    expect(CART_SERVICE.deleteItem).toHaveBeenCalledTimes(1);
    expect(CART_SERVICE.deleteItem).toHaveBeenCalledWith(CART_ITEM_1);
  }));
});
