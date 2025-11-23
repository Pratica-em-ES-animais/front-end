import { Address } from "./address.model";

export interface Ong{
    id : string,
    cnpj : string,
    name : string,
    email : string,
    ddd : string,
    phone : string,
    addressDto : Address
}