import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model, mongo } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>
  ) {

    }

  getHashPassword = (password: string) =>{
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto){
    const hasPassword = this.getHashPassword(createUserDto.password);
    let user = await this.userModel.create({ 
      email: createUserDto.email, 
      password: hasPassword, 
      name: createUserDto.name
    })
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Not Found User';
    return this.userModel.findOne({_id: id});
  }

  async update(updateUserDto: UpdateUserDto) {
    
    return await this.userModel.updateOne({_id : updateUserDto._id}, {...updateUserDto});
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id: id});
  }
}
