import { Type } from "class-transformer";
import { IsEmail, isNotEmpty, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company {
    @IsNotEmpty()
    _id : mongoose.Schema.Types.ObjectId;

    @IsNotEmpty()
    name: string;
}

export class CreateUserDto {
    @IsNotEmpty({message: "Name is not empty"})
    name : string;

    @IsEmail({}, {message: "Email is not right type"})
    @IsNotEmpty({message: "Email is not empty"})
    email: string;

    @IsNotEmpty({message: "Password is not empty"})
    password: string;

    @IsNotEmpty({message: "Age is not empty"})
    age: number;

    @IsNotEmpty({message: "Gender is not empty"})
    gender: string;

    @IsNotEmpty({message: "Address is not empty"})
    address: string;

    @IsNotEmpty({message: "Role is not empty"})
    role: string;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company : Company

}

export class RegisterUserDto {
    @IsNotEmpty({message: "Name is not empty"})
    name : string;

    @IsEmail({}, {message: "Email is not right type"})
    @IsNotEmpty({message: "Email is not empty"})
    email: string;

    @IsNotEmpty({message: "Password is not empty"})
    password: string;

    @IsNotEmpty({message: "Age is not empty"})
    age: number;

    @IsNotEmpty({message: "Gender is not empty"})
    gender: string;

    @IsNotEmpty({message: "Address is not empty"})
    address: string;

}

