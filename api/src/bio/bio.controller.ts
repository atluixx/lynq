import { Controller } from '@nestjs/common';
import { BioService } from './bio.service';

@Controller('bio')
export class BioController {
  constructor(private readonly bioService: BioService) {}
}
