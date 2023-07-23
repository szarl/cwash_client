import { Equals, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class LoginEmailRequest {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    constructor(data?: Partial<LoginEmailRequest>) {
        if(data) {
            Object.assign(this, data);
        }
    }
}