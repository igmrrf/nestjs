import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApplesService } from './apples.service';
import { CreateAppleDto } from './dto/create-apple.dto';
import { UpdateAppleDto } from './dto/update-apple.dto';

@Controller('apples')
export class ApplesController {
  constructor(private readonly applesService: ApplesService) {}

  @Post()
  create(@Body() createAppleDto: CreateAppleDto) {
    return this.applesService.create(createAppleDto);
  }

  @Get()
  findAll() {
    return this.applesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppleDto: UpdateAppleDto) {
    return this.applesService.updateById(id, updateAppleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applesService.removeById(id);
  }
}
