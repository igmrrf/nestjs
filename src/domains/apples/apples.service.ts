import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppleDto } from './dto/create-apple.dto';
import { UpdateAppleDto } from './dto/update-apple.dto';
import {
  Connection,
  DeleteResult,
  FilterQuery,
  FlattenMaps,
  Model,
} from 'mongoose';
import { Apple } from './entities/apple.schema';
import { Owner } from '../owners/entities/owner.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { databases } from 'src/common/constants/db.constants';

@Injectable()
export class ApplesService {
  constructor(
    @InjectModel(Apple.name, databases.plants)
    private readonly appleModel: Model<Apple>,

    @InjectConnection(databases.plants)
    private readonly connection: Connection,
  ) {}

  async create(createAppleDto: CreateAppleDto) {
    const apple = await this.appleModel.create(createAppleDto);
    return apple;
  }

  async findAllPopulated() {
    const apples = await this.appleModel
      .find()
      .populate<{ fans: Owner[] }>('owner fans');

    return apples;
  }

  async findAll() {
    const apples = await this.appleModel.find();
    return apples;
  }

  async findById(id: string): Promise<FlattenMaps<Apple>> {
    const apple = await this.appleModel.findById(id, undefined, { lean: true });
    if (!apple) {
      throw new NotFoundException('invalid apple id');
    }
    return apple;
  }

  async findMany(findApplesDto: FilterQuery<Apple>): Promise<Apple[]> {
    const apple = await this.appleModel.find(findApplesDto);
    return apple;
  }

  async findOne(findApplesDto: UpdateAppleDto): Promise<Apple | null> {
    const apple = await this.appleModel.findOne(findApplesDto);
    return apple;
  }

  async updateById(id: string, updateAppleDto: UpdateAppleDto): Promise<Apple> {
    // verify existence
    await this.findById(id);

    const apple = await this.appleModel.findByIdAndUpdate(id, updateAppleDto, {
      new: true,
    });

    return apple;
  }

  async updateOne(
    updateOneDto: UpdateAppleDto,
    updateAppleDto: UpdateAppleDto,
  ) {
    const apple = await this.appleModel.findOneAndUpdate(
      updateOneDto,
      updateAppleDto,
      { new: true },
    );
    return apple;
  }

  async updateMany(
    updateManyDto: UpdateAppleDto,
    updateAppleDto: UpdateAppleDto,
  ) {
    const apples = await this.appleModel.updateMany(
      updateManyDto,
      updateAppleDto,
      {
        new: true,
      },
    );
    return apples;
  }

  async removeById(id: string) {
    const apple = await this.appleModel.findByIdAndDelete(id);
    return apple;
  }

  async removeOne(removeDto: UpdateAppleDto) {
    const apple = await this.appleModel.findOneAndDelete(removeDto);
    return apple;
  }

  async removeMany(removeManyDto: UpdateAppleDto): Promise<DeleteResult> {
    const apple = await this.appleModel.deleteMany(removeManyDto);
    return apple;
  }
}
