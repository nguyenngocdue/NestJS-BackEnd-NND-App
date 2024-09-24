import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model, mongo } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name)
    private userModel: SoftDeleteModel<UserDocument>
  ) {

  }

  getModel() {
    return this.userModel;
  }

  getHashPassword = (password: string) => {
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  }


  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({email: createUserDto.email})
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    const hasPassword = this.getHashPassword(createUserDto.password);
    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hasPassword,
      name: createUserDto.name,
      company: {
        _id: createUserDto.company._id,
        name: createUserDto.company.name
      }
    })
    await user.save();
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Not Found User';
    return this.userModel.findOne({ _id: id });
  }

  findOneByUserName(userName: string) {
    return this.userModel.findOne({ email: userName });
  }

  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }


  async update(updateUserDto: UpdateUserDto) {

    return await this.userModel.updateOne({ _id: updateUserDto._id }, { ...updateUserDto });
  }

  remove(id: string) {
    return this.userModel.softDelete({ _id: id });
  }
}
