import { IsEmail, IsNotEmpty } from "class-validator";

//define shape for User
export class CreateCompanyDto {
    @IsNotEmpty({message: "Name isn't empty"})
    name: string;

    @IsNotEmpty(({message: "Address isn't empty"}))
    address: string;

    @IsNotEmpty(({message: "Description isn't empty"}))
    description: string;

}
