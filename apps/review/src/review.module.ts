import { Module } from '@nestjs/common';
import { RmqModule } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TASK_SERVICE } from 'apps/task/src/constants/services';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema: Joi.object({
				RABBIT_MQ_URI: Joi.string().required(),
				RABBIT_MQ_REVIEW_QUEUE: Joi.string().required()
			})
		}),
		// RmqModule,
		RmqModule.register({
			name: TASK_SERVICE
		})
	],
	controllers: [ ReviewController ],
	providers: [ ReviewService ]
})
export class ReviewModule {}
