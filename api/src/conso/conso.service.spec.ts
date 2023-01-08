import { Test, TestingModule } from '@nestjs/testing';
import { ConsoService } from './conso.service';

describe('ConsoService', () => {
  let service: ConsoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsoService],
    }).compile();

    service = module.get<ConsoService>(ConsoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
