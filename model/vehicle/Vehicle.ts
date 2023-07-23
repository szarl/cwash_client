import { IsOptional, IsNumber, Min } from "class-validator";

export class Vehicle {
    @IsOptional()
    @IsNumber()
    @Min(1)
    id: number;
}