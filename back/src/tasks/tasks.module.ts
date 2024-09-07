import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Task, TaskSchema } from './schemas/task.schema'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
	providers: [TasksService],
	controllers: [TasksController],
	imports: [
		MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
	],
})
export class TasksModule {}
