import { Test, TestingModule } from '@nestjs/testing';
import { ApplesService } from './apples.service';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { databases } from 'src/common/constants/db.constants';
import { Apple } from './entities/apple.schema';

describe('ApplesService', () => {
  const mockConnection = {};
  const mockAppleModel = {};
  let service: ApplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplesService,

        {
          provide: getConnectionToken(databases.plants),
          useValue: mockConnection,
        },
        {
          provide: getModelToken(Apple.name),
          useValue: mockAppleModel,
        },
      ],
    }).compile();

    service = module.get<ApplesService>(ApplesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
