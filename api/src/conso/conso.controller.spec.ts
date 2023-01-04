import { Test, TestingModule } from '@nestjs/testing';
import { ConsoController } from './conso.controller';
import { ConsoService } from './conso.service';

describe('ConsoController', () => {
  let controller: ConsoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsoController],
      providers: [ConsoService],
    }).compile();

    controller = module.get<ConsoController>(ConsoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
