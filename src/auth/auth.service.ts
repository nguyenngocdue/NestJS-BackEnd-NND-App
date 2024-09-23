import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }
    // username + pass are 2 parameters that passport library return
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUserName(username);
        if (user){
            const isValid = this.usersService.isValidPassword(pass, user.password);
            if(isValid){
                return user;
            }
        }
        return null;
    }
}
