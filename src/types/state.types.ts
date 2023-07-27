import { CartItem } from "./product.types";
import { User } from "./user.types";

export interface State { 
    cart?:any;
    auth?:{
        userInfo?:User,
        token?:string
    }
}

export interface CartState {
    cartItems: any;
    orderItems: CartItem[]; 
    shippingAddress: any; 
    paymentMethod: string; 
    itemsPrice: string; 
    shippingPrice: string; 
    taxPrice: string; 
    totalPrice: string; 
  }