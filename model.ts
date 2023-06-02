export class FoodItems {
  public foodId: string;
  public itemName: string;
  public itemCategory: string;
  public itemPrice: number;
  public itemDescription: string;
  public isAvailable: boolean;

  constructor(
    foodId: string,
    itemName: string,
    itemCategory: string,
    itemPrice: number,
    itemDescription: string,
    isAvailable: boolean
  ) {
    this.foodId = foodId;
    this.itemName = itemName;
    this.itemCategory = itemCategory;
    this.itemPrice = itemPrice;
    this.itemDescription = itemDescription;
    this.isAvailable = isAvailable;
  }
}

export class Orders {
  public orderId: string;
  public customerId: string;
  public amount: number;

  constructor(orderId: string, customerId: string, amount: number) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.amount = amount;
  }
}

export class FoodItemOrders {
  public orderId: string;
  public foodId: string;
  public quantity: number;

  constructor(orderId: string, foodId: string, quantity: number) {
    this.orderId = orderId;
    this.foodId = foodId;
    this.quantity = quantity;
  }
}

export class FoodDetails {
  public foodId: string;
  public itemName: string;
  public itemPrice: number;
  public quantity: number;
  public isAvailable: boolean;

  constructor(
    foodId: string,
    itemName: string,
    itemPrice: number,
    quantity: number,
    isAvailable: boolean
  ) {
    this.foodId = foodId;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.quantity = quantity;
    this.isAvailable = isAvailable;
  }
}
