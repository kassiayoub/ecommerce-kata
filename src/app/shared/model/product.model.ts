import { roundToNearestFive, sumOf } from "../utils/number-utils";

export class Product {
  private readonly _id: number;
  private readonly _productName: string;
  private readonly _price: number;
  private _quantity: number;
  private readonly _isImported: boolean;
  private readonly _category: ProductCategory;
  private _applicableTaxes: number[];

  constructor(
    id: number,
    productName: string,
    price: number,
    quantity: number,
    isImported: boolean,
    category: ProductCategory,
    applicableTaxes: number[]
  ) {
    this._id = id;
    this._productName = productName;
    this._price = price;
    this._quantity = quantity;
    this._isImported = isImported;
    this._category = category;
    this._applicableTaxes = applicableTaxes;
  }

  get id(): number {
    return this._id;
  }

  get productName(): string {
    return this._productName;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  get isImported(): boolean {
    return this._isImported;
  }

  get category(): ProductCategory {
    return this._category;
  }

  get applicableTaxes(): number[] {
    return this._applicableTaxes;
  }

  set applicableTaxes(applicableTaxes: number[]) {
    this._applicableTaxes = applicableTaxes;
  }

  get taxAmount(): number {
    return sumOf(this.applicableTaxes.map(applicableTaxe => roundToNearestFive((this.price * applicableTaxe) / 100) ));
  }

  get afterTaxPrice(): number {
    return this.price + this.taxAmount;
  }

}

export enum ProductCategory {
  FOOD = 'Food',
  MEDICINE = 'Medecine',
  BOOK = 'Books',
  ELECTRIC = 'Electric',
  PARFUME = 'Parfum',
}
