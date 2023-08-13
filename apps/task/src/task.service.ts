import { CreateTask } from './dto/create-task';
import { TaskRepository } from './task.repository';
import { REVIEW_SERVICE } from './constants/services';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TaskService {
	constructor(
		private readonly taskRepository: TaskRepository,
		@Inject(REVIEW_SERVICE) private reviewClient: ClientProxy
	) {}

	getHello(): string {
		return 'Hello World!';
	}

	async createTask(request: CreateTask) {
		const session = await this.taskRepository.startTransaction();
		try {
			const order = await this.taskRepository.create(request);
			await lastValueFrom(
				this.reviewClient.emit('task_created', {
					request
				})
			);

			return order;
		} catch (err) {
			throw err;
		}
	}

	async getTasks() {
		return this.taskRepository.find({});
	}

	async resposneBack(data: any) {
		console.log('coming from review service :', data);
	}
}
