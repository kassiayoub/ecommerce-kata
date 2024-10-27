import { Product, ProductCategory } from './product.model';

describe('Product', () => {
  it('should compute tax amount when no tax is applicable', () => {
    // Given
    const product: Product = new Product(1, 'P', 10, 10, false, ProductCategory.ELECTRIC, []);

    // When & then
    expect(product.taxAmount).toEqual(0);
    expect(product.afterTaxPrice).toEqual(10);
  });

  it('should compute tax amount when one tax is applicable', () => {
    // Given
    const product: Product = new Product(1, 'P', 10.2, 10, false, ProductCategory.ELECTRIC, [10]);

    // When & then
    expect(product.taxAmount).toEqual(1.05);
    expect(product.afterTaxPrice).toEqual(11.25);
  });

  it('should compute tax amount when many taxes are applicable', () => {
    // Given
    const product: Product = new Product(1, 'P', 10.6, 10, false, ProductCategory.ELECTRIC, [10, 20]);

    // When & then
    expect(product.taxAmount).toEqual(3.25);
    expect(product.afterTaxPrice).toEqual(13.85);
  });
});
