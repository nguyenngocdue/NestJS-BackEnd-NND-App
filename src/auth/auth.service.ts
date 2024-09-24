import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }
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

    async login(user: IUser) {
        const {_id, name, email, role} = user;
        const payload = {
            sub : "token login",
            iss: "from server",
            _id,
            name,
            email,
            role,
        };
        return {
          access_token: this.jwtService.sign(payload),
          _id,
          name,
          email,
          role,
        };
    }

    async create(registerUserDto: RegisterUserDto){
        const hashPassword =   this.usersService.getHashPassword(registerUserDto.password);
        let user = await this.usersService.getModel().create({
            name: registerUserDto.name,
            email: registerUserDto.email,
            password: hashPassword,
            age: registerUserDto.age,
            gender: registerUserDto.gender,
            address: registerUserDto.address,
        })
        return user;
    }
}
