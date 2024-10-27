import { CartItem } from './cart-item.model';
import { Product, ProductCategory } from './product.model';

describe('CartItem', () => {
  it('should compute after tax price when no tax is applicable', () => {
    // Given
    const product: Product = new Product(1, 'P', 10, 20, false, ProductCategory.ELECTRIC, []);
    const cartItem: CartItem = new CartItem(product, 10);

    // When & then
    expect(cartItem.taxAmount).toEqual(0);
    expect(cartItem.afterTaxPrice).toEqual(100);
  });

  it('should compute after tax price when one tax is applicable', () => {
    // Given
    const product: Product = new Product(1, 'P', 10, 20, false, ProductCategory.ELECTRIC, [10]);
    const cartItem: CartItem = new CartItem(product, 10);

    // When & then
    expect(cartItem.taxAmount).toEqual(10);
    expect(cartItem.afterTaxPrice).toEqual(110);
  });

  it('should compute after tax price when many taxes are applicable', () => {
    // Given
    const product: Product = new Product(1, 'P', 10, 20, false, ProductCategory.ELECTRIC, [10, 20]);
    const cartItem: CartItem = new CartItem(product, 10);

    // When & then
    expect(cartItem.taxAmount).toEqual(30);
    expect(cartItem.afterTaxPrice).toEqual(130);
  });
});
