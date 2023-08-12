import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule } from '@app/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { REVIEW_SERVICE } from './constants/services';
import { TaskRepository } from './task.repository';
import { Task, TaskSchema } from './schemas/task.schema';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/task/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    RmqModule.register({
      name: REVIEW_SERVICE,
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
})
export class TaskModule {}
