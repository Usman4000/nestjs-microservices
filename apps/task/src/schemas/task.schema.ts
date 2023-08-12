import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Task extends AbstractDocument {
	@Prop() title: string;

	@Prop() body: string;

	@Prop() review: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
