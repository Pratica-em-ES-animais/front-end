import { Role } from "./role.model";

export interface UserLogin{
    id : string,
    role : Role,
    firstName : string,
    lastName : string,
}