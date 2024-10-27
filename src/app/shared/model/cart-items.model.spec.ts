import { CartItem } from './cart-item.model';
import { CartItems } from './cart-items.model';
import { Product, ProductCategory } from './product.model';

describe('CartItems', () => {
  const product1: Product = new Product(1, 'P1', 10, 20, false, ProductCategory.ELECTRIC, [10]);
  const product2: Product = new Product(2, 'P2', 100, 20, false, ProductCategory.PARFUME, [5, 15]);
  const cartItem1: CartItem = new CartItem(product1, 4);
  const cartItem2: CartItem = new CartItem(product2, 6);

  it('should add item to cart', () => {
    // Given
    const cartItems: CartItems = new CartItems();

    // When
    cartItems.addItem(cartItem1);
    cartItems.addItem(cartItem2);

    // Then
    expect(cartItems.itemsCount).toEqual(10);
  });

  it('should delete item from cart', () => {
    // Given
    const cartItems: CartItems = new CartItems();
    cartItems.addItem(cartItem1);
    cartItems.addItem(cartItem2);

    // When
    cartItems.deleteItem(cartItem2);

    // Then
    expect(cartItems.items.has(cartItem1.product.id)).toEqual(true);
    expect(cartItems.items.has(cartItem2.product.id)).toEqual(false);
    expect(cartItems.itemsCount).toEqual(4);
  });

  it('should compute tax amount', () => {
    // Given
    const cartItems: CartItems = new CartItems();
    cartItems.addItem(cartItem1);
    cartItems.addItem(cartItem2);

    // When & then
    expect(cartItems.taxAmount).toEqual(124);
    expect(cartItems.afterTaxPrice).toEqual(640 + 124);
  });
});
