export interface User {
    _id:string;
    name:string;
    email:string;
    isAdmin:boolean;
    password?:string;
    confirmPassword?:string;
}

export interface RegisterData {

}
export interface UpdateProfileData {
    _id: string;
     name:string;
     email:string;
     password:string;
     confirmPassword:string;
     isAdmin:boolean;
}

