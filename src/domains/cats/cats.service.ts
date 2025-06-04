import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import {
  InjectConnection,
  InjectModel,
  ModelDefinition,
} from '@nestjs/mongoose';
import { Cat } from './entities/cat.schema';
import mongoose, { Connection, DeleteResult, Model } from 'mongoose';
import { Owner } from '../owners/entities/owner.schema';
import { CatBreeds } from './cat.types';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async getFansCatBreed(catId: string): Promise<CatBreeds[]> {
    // TODO:  // 1. get cat // 2. get cat with owner in fans // 3. get breeds

    this.logger.log({ catId });
    const result = await this.catModel.aggregate([
      // Match the cat by ID
      {
        $match: {
          _id: new mongoose.Types.ObjectId(catId),
        },
      },
      // Lookup fans from the same collection
      {
        $lookup: {
          from: this.catModel.collection.name, // 'cats' collection
          localField: 'fans',
          foreignField: 'owner',
          as: 'fanCats',
        },
      },
      // Project only their breeds
      {
        $project: {
          breeds: '$fanCats.breed',
        },
      },
      // Flatten into an array of breeds
      {
        $unwind: {
          path: '$breeds',
          preserveNullAndEmptyArrays: false,
        },
      },
      // Group all breeds into one array
      {
        $group: {
          _id: null,
          breeds: { $addToSet: '$breeds' }, // use `$push` if duplicates are fine
        },
      },
      // Optional: clean result
      {
        $project: {
          _id: 0,
          breeds: 1,
        },
      },
    ]);
    // .explain('executionStats');
    this.logger.log(result);

    return result[0]?.breeds ?? [];
  }

  async create(createCatDto: CreateCatDto) {
    const cat = await this.catModel.create(createCatDto);
    return cat;
  }

  async findAllPopulated() {
    const cats = await this.catModel
      .find()
      .populate<{ fans: Owner[] }>('owner');

    const cat = cats[0];
    // autopopulated because of type
    cat.owner.name;

    // manually populated because of type
    cat.fans[0].name;
  }

  async findAll() {
    const cats = await this.catModel.find();
    return cats;
  }

  async findById(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id);
    if (!cat) {
      throw new NotFoundException('invalid cat id');
    }
    return cat;
  }

  async findOne(findCatsDto: UpdateCatDto): Promise<Cat | null> {
    const cat = await this.catModel.findOne(findCatsDto);
    return cat;
  }

  async updateById(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    // verify existence
    await this.findById(id);

    const cat = await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true,
    });

    return cat;
  }

  async updateOne(updateOneDto: UpdateCatDto, updateCatDto: UpdateCatDto) {
    const cat = await this.catModel.findOneAndUpdate(
      updateOneDto,
      updateCatDto,
      { new: true },
    );
    return cat;
  }

  async updateMany(updateManyDto: UpdateCatDto, updateCatDto: UpdateCatDto) {
    const cats = await this.catModel.updateMany(updateManyDto, updateCatDto, {
      new: true,
    });
    return cats;
  }

  async removeById(id: string) {
    const cat = await this.catModel.findByIdAndDelete(id);
    return cat;
  }

  async removeOne(removeDto: UpdateCatDto) {
    const cat = await this.catModel.findOneAndDelete(removeDto);
    return cat;
  }

  async removeM(removeManyDto: UpdateCatDto): Promise<DeleteResult> {
    const cat = await this.catModel.deleteMany(removeManyDto);
    return cat;
  }
}
