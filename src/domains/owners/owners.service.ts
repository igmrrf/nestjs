import { Injectable, Logger } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from './entities/owner.schema';
import { Model } from 'mongoose';
import { collections, databases } from 'src/common/constants/db.constants';

@Injectable()
export class OwnersService {
  private readonly logger = new Logger(OwnersService.name);
  constructor(
    @InjectModel(Owner.name, databases.animals)
    private readonly ownerModel: Model<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const owner = await this.ownerModel.create(createOwnerDto);
    return owner;
  }

  async findAll() {
    const owner = await this.ownerModel.find();
    return owner;
  }

  async findById(id: string) {
    this.logger.log(collections);
    const owner = await this.ownerModel.findById(id);
    return owner;
  }

  async updateById(id: string, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownerModel.findByIdAndUpdate(id, updateOwnerDto);
    return owner;
  }

  async removeById(id: string) {
    const owner = await this.ownerModel.findByIdAndDelete(id);
    return owner;
  }
}
