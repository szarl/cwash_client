import { LoginEmailRequest } from '~/model/user/LoginEmailRequest';
import { ajaxService } from '../ajaxService';
import { instanceToPlain } from 'class-transformer';
import { CUser } from '~/model/user/CUser';
import { User } from '~/model/user/User';


export const userService = new class UserService {

    async registerUser(cuser: User): Promise<User> {
        const urlEndpoint = '/user/';
        return ajaxService.post<User>(urlEndpoint, instanceToPlain(cuser)) as Promise<User>;
    }

    async login(userReq: LoginEmailRequest): Promise<User> {
        const urlEndpoint = '/login/';
        return ajaxService.post<User>(urlEndpoint, instanceToPlain(userReq)) as Promise<User>
    }
}()