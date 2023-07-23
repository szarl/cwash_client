import { Exclude } from 'class-transformer';
import { Equals, IsEmail, IsNumber, IsOptional, Min } from 'class-validator';

export class User {

    @IsOptional()
    @IsNumber()
    @Min(1)
    id: number;
    
    first_name: string;

    last_name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    password: string;

    @Exclude()
    @IsOptional()
    @Equals((o: { password: any; repeteadPassword: any; }) => o.password === o.repeteadPassword)
    repeteadPassword: string;

    constructor(data?: Partial<User>) {
        if(data) {
            Object.assign(this, data);
        }
    }
}