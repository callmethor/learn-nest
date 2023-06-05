import { Test, TestingModule } from '@nestjs/testing';
import { Ninjas } from './ninjas';

describe('Ninjas', () => {
  let provider: Ninjas;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ninjas],
    }).compile();

    provider = module.get<Ninjas>(Ninjas);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
