import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { TaskModule } from './task.module';

async function bootstrap() {
	const app = await NestFactory.create(TaskModule);
	app.useGlobalPipes(new ValidationPipe());
	const configService = app.get(ConfigService);
	const rmqService = app.get<RmqService>(RmqService);
	app.connectMicroservice(rmqService.getOptions('Task'));
	await app.startAllMicroservices();
	await app.listen(3000);
}
bootstrap();
