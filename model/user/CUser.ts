import { User } from "./User";
import { EnumAccountType } from "./enum/EnumAccountType";

export class CUser {
    user: User;

    account_type: EnumAccountType;

    dob: Date;

    constructor(data?: Partial<CUser>) {
        if(data) {
            Object.assign(this, data);
        }
    }
}