import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { CartService } from '../../shared/service/cart.service';
import { Product, ProductCategory } from '../../shared/model/product.model';
import { CartItem } from '../../shared/model/cart-item.model';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const cartService = {
    addItem: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductComponent],
      providers: [{ provide: CartService, useValue: cartService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = new Product(1, 'P', 10, 10, false, ProductCategory.ELECTRIC, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cart item and reset quantity to 1 on add to cart', () => {
    // Given
    const product: Product = new Product(1, 'P', 10, 10, false, ProductCategory.ELECTRIC, []);
    const quantity: number = 10;

    component.product = product;
    component.addToCartFormGroup.patchValue({ quantity });
    component.addToCartEventEmitter.emit = jest.fn();
    const mouseEvent = new MouseEvent('Click');
    mouseEvent.preventDefault = jest.fn();

    // When
    component.addToCart(mouseEvent);

    // Then
    expect(mouseEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(component.addToCartEventEmitter.emit).toHaveBeenCalledTimes(1);
    expect(component.addToCartEventEmitter.emit).toHaveBeenCalledWith(new CartItem(product, quantity));
    expect(component.addToCartFormGroup.controls['quantity'].value).toEqual(1);
  });
});
