import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { ReviewModule } from './review.module';

async function bootstrap() {
  const app = await NestFactory.create(ReviewModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('Review'));
  await app.startAllMicroservices();
}
bootstrap();
