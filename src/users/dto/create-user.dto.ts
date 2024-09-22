import { IsEmail, IsNotEmpty } from "class-validator";

//define shape for User
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    name: string;
    address: string;
}
