import { Controller, Get } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { TASK_SERVICE } from 'apps/task/src/constants/services';

@Controller()
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
		private readonly rmqService: RmqService,
		@Inject(TASK_SERVICE) private readonly client: ClientProxy
	) {}

	@Get()
	getHello(): string {
		return this.reviewService.getHello();
	}

	@EventPattern('task_created')
	async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
		this.reviewService.review(data);
    this.rmqService.ack(context);    
		await lastValueFrom(
			this.client.emit('task_created', {
				data
			})
		);
	}
}
