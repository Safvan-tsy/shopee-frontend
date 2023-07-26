export interface ProductType {
    _id:string;
    name:string;
    image:string;
    price:number;
    rating:number;
    description:string;
    numReviews:number;
    countInStock:number;
    brand:string;
    category:string;
}


export interface CartItem {
    _id:string;
    name:string;
    price:number;
    qty:number;
    taxPrice?:string;
    shippingPrice?:string;
    itemsPrice?:string;
    image?:string;
  }
  