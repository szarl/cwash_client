import { IsNotEmpty, IsNumber, IsOptional, Length, Min } from "class-validator";

export class Address {
    @IsOptional()
    @IsNumber()
    @Min(1)
    id: number;

    @IsNotEmpty()
    street: string;

    houseNumber: string;

    flatNumber: string;

    @IsNotEmpty()
    city: string;

    @Length(2)
    countryCode: string;

    constructor(data?: Partial<Address>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}