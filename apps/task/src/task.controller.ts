import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateTask } from './dto/create-task';
import {  RmqService } from '@app/common';


@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService, private readonly rmqService: RmqService) {}

	@Get('Hello')
	getHello(): string {
		return this.taskService.getHello();
	}

	@Post()
	async createTask(@Body() request: CreateTask, @Req() req: any) {
		return this.taskService.createTask(request);
	}

	@Get()
	async getTask() {
		return this.taskService.getTasks();
	}

	@EventPattern('task_created')
	async back(@Payload() data: any, @Ctx() context: RmqContext) {
		this.taskService.resposneBack(data);

		this.rmqService.ack(context);
	}
}
