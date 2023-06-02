import { Component, DoCheck, OnInit } from '@angular/core';
import { FoodDetails, FoodItemOrders, Orders, FoodItems } from './model';
import { CustomersService } from '../services/customers.service';
import { MessageService } from 'primeng/api';
import { FooditemsService } from '../services/fooditems.service';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  constructor(private foodService : FooditemsService,
              private customerService:CustomersService,
              private orderService:OrdersService,
              private messageService:MessageService){

  }

  disabled:boolean = true;

  // Properties for Food Item Details

  foodId:string = '';
  itemName:string = '';
  itemPrice:number = 0;
  quantity:number = 0;
  isAvailable!:boolean;

  // Properties for Customer 

  customerId:string = '';
  customerPhoneNumber:number = 0;

  // Properties for Order
  
  orderId!:string;           // will be assigned in ngOnInit
  totalAmount:number = 0; 

  // ngOnInit is a place where we can place the initialization logic
  // Retrieve food item objects and store item name in foodItems array
  // Generate order as ORD + (timestamp)

  foodItems : string[] = [];

  ngOnInit(): void {
    this.foodService.getAllFoodItems().
    subscribe({
      next:(foodItems) => {
        this.foodItems = foodItems.map((item) => (item.itemName));
      },
      error: (error) => {
        console.log(error.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' });
      }
    })

    // Generate order id using timestamp

    let prefix : string = 'ORD';
    let timestamp: string = Date.now().toString().padStart(14, '0');
    this.orderId = prefix + timestamp;
  }

  // This method will populate all the food details based on the food item name

  fillDetails(){       
    this.foodService.getFoodItemsByName(this.itemName).
    subscribe({
      next:(foodItem) => {
        this.foodId = foodItem.foodId;
        this.itemPrice = foodItem.itemPrice;
        this.isAvailable = foodItem.isAvailable;

        // If item isn't available, we cannot add that item
        // isAvailable binds with [disabled] property of the add button

        if(this.isAvailable === true){
          this.disabled = false;
        }
        else{
          this.disabled = true;
        }
      },

      // In case of server error, we cannot retrieve the records
      // Here toast message will pop up displaying the error message

      error: (err) => {
        console.log(err.message);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' });
      }
    })
  }

  /*
  Maintain an array to store the data temporarily
  Loop over this array
  Create object of FoodItemOrders using orderId, foodId and quantity at each iteration
  Push that object to the database using API
  */

  foods : FoodDetails[] = [];

  addItem() {

    const foodItem: FoodDetails = {
      foodId: this.foodId,          
      itemName: this.itemName,
      quantity: this.quantity,
      itemPrice:this.itemPrice,
      isAvailable: this.isAvailable             
    };

    this.foods.push(foodItem);

    // Calculate the total amount

    this.totalAmount = this.totalAmount + (this.quantity * this.itemPrice)

    // Reset form fields

    this.foodId = '';
    this.itemName = '';
    this.itemPrice = 0;
    this.quantity = 0;
    
    // Once we add the food details in the array we want to disable add button again

    this.disabled = true;
  }

  // Method to remove object from the array

  removeItem(foodItem: FoodDetails, index: number) {

    // Removing items will reduce the total amount
    // So we need to perform this before we remove that item

    this.totalAmount = this.totalAmount - (foodItem.quantity * foodItem.itemPrice)
    this.foods.splice(index, 1);
  }


  // addCustomer() will accept the phone number and fill the customer Id by calling API enpoint

  addCustomer(){
    this.customerService.getCustomerByPhoneNumber(this.customerPhoneNumber).
    subscribe({
      next:(customer) => {
        this.customerId = customer.customerId;
      },
      error:(error) => {
        this.customerId = '';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' });
        }
      })
  }

  resetCustomerDetails(){
    this.customerId = '';
    this.customerPhoneNumber = 0;
  }

  // placeOrder method will bind the properties to form Orders object
  // Will call the placeOrder method defined in the order service
  
  placed:boolean=false;

  placeOrder(){

    const orderRequest = {
      customerId: this.customerId,
      orderId:this.orderId,
      amount:this.totalAmount
    } as Orders

    this.orderService.placeOrder(orderRequest).
    subscribe({
      next:(order) => {

        // Add records into the junction table - FoodItemOrders
        // Junction Table will be the last one to be updated

        for(let i = 0; i < this.foods.length; i++){

          const item = this.foods[i];

          // Create object of class FoodItemOrders

          let itemRequest = {
              foodId: item.foodId,
              orderId: this.orderId,
              quantity:item.quantity
              } as FoodItemOrders

          this.orderService.addItemDetails(itemRequest).
          subscribe({
            next: (item) => {
              console.log(item);
            },
            error: (err) => {
              console.log(err.message);
            }
          })
        }

        this.placed = true;
        console.log("order placed successfully");
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order Placed' });

        // If order placed successfully, clear the foods list for the next order 
        // Reset the total amount to 0

        if(this.placed){
          this.clearList();
        }
        
      },
      error:(error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' });
      }
    })

    this.customerId = '';
    this.customerPhoneNumber = 0;

  }

  clearList(){
    this.foods = [];
    this.totalAmount = 0;
  }

}


