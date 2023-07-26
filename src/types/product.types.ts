export interface ProductType {
    _id:string;
    name:string;
    image:string;
    price:number;

}


export interface CartItem {
    _id:string;
    name:string;
    price:number;
    qty:number;
    image?:string;
  }
  