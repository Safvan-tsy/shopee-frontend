import { User } from "./user.types";

export interface State { 
    cart?:any;
    auth?:{
        userInfo?:User,
        token?:string
    }
}