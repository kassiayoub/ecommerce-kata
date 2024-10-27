import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { Product, ProductCategory } from '../shared/model/product.model';
import { CartItem } from '../shared/model/cart-item.model';
import { CartItems } from '../shared/model/cart-items.model';
import { BehaviorSubject, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { ProductComponent } from './product/product.component';
import { ProductService } from '../shared/service/product.service';
import { CartService } from '../shared/service/cart.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let PRODUCT_1: Product;
  let PRODUCT_2: Product;
  let CART_ITEM_1: CartItem;
  let CART_ITEM_2: CartItem;
  let CART_ITEMS: CartItems;

  const PRODUCT_SERVICE = {
    getProducts: jest.fn(),
    getProductsByCategory: jest.fn(),
    getProductCategories: jest.fn(),
  };
  const CART_SERVICE: any = { addItem: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();

    PRODUCT_1 = new Product(1, 'P1', 10, 10, false, ProductCategory.ELECTRIC, [10, 20]);
    PRODUCT_2 = new Product(2, 'P2', 20, 20, true, ProductCategory.FOOD, []);
    CART_ITEM_1 = new CartItem(PRODUCT_1, 1);
    CART_ITEM_2 = new CartItem(PRODUCT_2, 2);
    CART_ITEMS = new CartItems();
    CART_ITEMS.addItem(CART_ITEM_1);
    CART_ITEMS.addItem(CART_ITEM_2);

    PRODUCT_SERVICE.getProducts.mockReturnValue(of([PRODUCT_1, PRODUCT_2]));
    PRODUCT_SERVICE.getProductsByCategory.mockReturnValue(of([PRODUCT_2]));
    PRODUCT_SERVICE.getProductCategories.mockReturnValue(of(Object.keys(ProductCategory)));
    CART_SERVICE.cartItems$ = new BehaviorSubject<CartItems>(new CartItems());

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductListComponent, MockComponent(ProductComponent)],
      providers: [
        { provide: ProductService, useValue: PRODUCT_SERVICE },
        { provide: CartService, useValue: CART_SERVICE },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products, categories and update quantities according to cart existing items on landing', fakeAsync(() => {
    // Given
    const expectedProduct1: Product = new Product(
      PRODUCT_1.id,
      PRODUCT_1.productName,
      PRODUCT_1.price,
      9,
      PRODUCT_1.isImported,
      PRODUCT_1.category,
      PRODUCT_1.applicableTaxes
    );
    const expectedProduct2: Product = new Product(
      PRODUCT_2.id,
      PRODUCT_2.productName,
      PRODUCT_2.price,
      18,
      PRODUCT_2.isImported,
      PRODUCT_2.category,
      PRODUCT_2.applicableTaxes
    );
    CART_SERVICE.cartItems$.next(CART_ITEMS);

    // When
    component.ngOnInit();

    // Then
    expect(PRODUCT_SERVICE.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual([expectedProduct1, expectedProduct2]);
    expect(component.categories).toEqual(Object.keys(ProductCategory));
  }));

  it('should load products by category when filtering by product category', fakeAsync(() => {
    // Given
    component.products = [];
    component.filterByCategoryFormGroup.patchValue({ category: ProductCategory.FOOD });

    // When
    component.onSelectCategory();

    // Then
    expect(PRODUCT_SERVICE.getProductsByCategory).toHaveBeenCalledWith(ProductCategory.FOOD);
    expect(component.products).toEqual([PRODUCT_2]);
  }));

  it('should load all products when category field is reset', fakeAsync(() => {
    // Given
    component.products = [];
    component.filterByCategoryFormGroup.patchValue({ category: null });

    // When
    component.onSelectCategory();

    // Then
    expect(PRODUCT_SERVICE.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual([PRODUCT_1, PRODUCT_2]);
  }));

  it('should add to card and update remaining product quantity', () => {
    // When
    component.addToCart(CART_ITEM_1);

    // Then
    expect(CART_SERVICE.addItem).toHaveBeenCalledWith(CART_ITEM_1);
    expect(CART_ITEM_1.product.quantity).toEqual(9);
  });
});
