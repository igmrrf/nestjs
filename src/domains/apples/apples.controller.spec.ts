import { Test, TestingModule } from '@nestjs/testing';
import { ApplesController } from './apples.controller';
import { ApplesService } from './apples.service';

describe('ApplesController', () => {
  let controller: ApplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplesController],
      providers: [ApplesService],
    }).compile();

    controller = module.get<ApplesController>(ApplesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
