import { User } from "./user.types";

export interface ProductType {
    _id:string;
    sellerId:string;
    name:string;
    image:string;
    price:number;
    rating:number;
    description:string;
    numReviews:number;
    countInStock:number;
    brand:string;
    category:string;
    shippingPrice:number;
}


export interface CartItem {
    _id:string;
    name:string;
    price:number;
    qty:number;
    countInStock: number;
    product?: string;
    totalPrice?: string; 
    taxPrice?:string;
    shippingPrice?:string;
    itemsPrice?:string;
    image?:string;
  }

export interface orderType { 
    orderItems: CartItem[]; 
    shippingAddress: any; 
    paymentMethod: string; 
    itemsPrice: string; 
    shippingPrice: string; 
    taxPrice: string; 
    totalPrice: string; 
    token?: string; 
    createdAt?:any;
    _id?:string;
    product?:string;
    isDelivered?:boolean; 
    deliveredAt?:any;
    user?:User;
    isPaid?:boolean;
    paidAt?:any;
}

export interface CartItem {
    userId: string;
    sellerId: string;
    status: string;
    orderItems: [
        {
            name: string;
            qty: number;
            image: string;
            price: number;
            productId: string,
            itemsPrice: number;
            taxPrice: number;
            shippingPrice: number;
            totalPrice: number;
        }
    ];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        state:string;
        country: string
    };
    paymentMethod?: string;
    cartTotal: number;
    isPaid?: boolean;
    paidAt?: Date;
    isDelivered?: boolean;
    deliveredAt?: Date;
}