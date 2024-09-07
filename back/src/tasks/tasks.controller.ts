import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Patch,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TasksService } from './tasks.service'
import { Task } from './schemas/task.schema'

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	getAll(): Promise<Task[]> {
		return this.tasksService.getAll()
	}

	@Get(':id')
	getOne(@Param('id') id: string): Promise<Task> {
		return this.tasksService.getById(id)
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@Header('Cache-Control', 'no-cache')
	create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksService.create(createTaskDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<Task> {
		return this.tasksService.remove(id)
	}

	@Put(':id')
	update(
		@Body() updateTaskDto: UpdateTaskDto,
		@Param('id') id: string
	): Promise<Task> {
		return this.tasksService.update(id, updateTaskDto)
	}

	@Patch(':id')
	updateTask(
		@Body() toggleTaskDone: UpdateTaskDto,
		@Param('id') id: string
	): Promise<Task> {
		return this.tasksService.updateTask(id, toggleTaskDone)
	}
}
