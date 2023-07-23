import { Exclude } from "class-transformer";
import { Address } from "../address/Adress";

export class Washing {
    addressId: number;

    @Exclude()
    address: Address;

    vehicleId: number;

    description: string;
}