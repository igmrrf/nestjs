import { Cat } from 'src/domains/cats/entities/cat.schema';
import { Owner } from 'src/domains/owners/entities/owner.schema';

export const collections = [Cat.name, Owner.name] as const;

export const databases = {
  plants: 'plants',
  animals: 'animals',
  nest: 'nest',
} as const;
