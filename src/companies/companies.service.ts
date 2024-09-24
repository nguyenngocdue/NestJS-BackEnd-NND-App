import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, companyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class CompaniesService {

  constructor (
    @InjectModel(Company.name)
    private companyModel : SoftDeleteModel<companyDocument>
  ) {

  }

  async create(createCompanyDto : CreateCompanyDto, user : IUser) {
    let company = await this.companyModel.create({...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
    return company;
  }

  findOne(id : string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'Not found company'
    return this.companyModel.findOne({_id : id})
  }
  
  findAll() {
    return this.companyModel.find();
  }

  async remove(id : string, user: IUser) {
    const delResponse = await this.companyModel.softDelete({_id : id});
    if (delResponse.deleted > 0) {
      await this.companyModel.updateOne(
        {_id : id},
        {
          $set: {
            deletedBy: {
              _id: user._id,
              email: user.email
            }
          }
        }
      )
      return "Item successfully deleted";
    }
    return 'Delete item failed';
  }

  async update(updateCompanyDto: UpdateCompanyDto) {
    return await this.companyModel.updateOne({_id: updateCompanyDto._id}, {...updateCompanyDto});
  }


}
