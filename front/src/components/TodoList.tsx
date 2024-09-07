import { useEffect, useState } from 'react'
import TaskStatus from './TaskStatus'
import { TaskInterface } from '../Interfaces/interfaces'
import CreateTaskInput from './CreateTaskInput'
import TasksList from './TasksList'
import confetti from 'canvas-confetti'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const baseUrl = 'http://localhost:3000/tasks'

const TodoList = () => {
	const [tasks, setTasks] = useState<TaskInterface[]>([])

	useEffect(() => {
		fetch(baseUrl)
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(data => setTasks(data))
			.catch(error =>
				console.error('There was a problem with the fetch operation:', error)
			)
	}, [])

	const addTask = (text: string) => {
		fetch(baseUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text, done: false }),
		}).then(res => {
			if (!res.ok) {
				throw new Error('Network response was not ok')
			}
			res.json().then(data => {
				setTasks(prevTasks => [
					{ text, done: false, _id: data._id },
					...prevTasks,
				])
				toast.success('Task CREATED successfully! 👍')
			})
		})

		confetti({
			particleCount: 200,
			spread: 120,
			origin: { y: 1 },
		})
	}

	const toggleTaskDone = (_id: string, done: boolean) => {
		fetch(`${baseUrl}/${_id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ done }),
		})
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(updatedTask => {
				setTasks(prevTasks =>
					prevTasks.map(task => (task._id === _id ? updatedTask : task))
				)
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error)
				toast.error('Failed to update task status')
			})
	}

	const deleteTask = (_id: string) => {
		fetch(`${baseUrl}/${_id}`, {
			method: 'DELETE',
		})
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				setTasks(prevTasks => prevTasks.filter(task => task._id !== _id))
				toast.error('Task DELETED successfully! 🚮')
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error)
				toast.error('Failed to delete task')
			})
	}

	const updateTask = (_id: string, newText: string) => {
		fetch(`${baseUrl}/${_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ text: newText }),
		})
			.then(res => {
				if (!res.ok) {
					throw new Error('Network response was not ok')
				}
				return res.json()
			})
			.then(updatedTask => {
				setTasks(prevTasks =>
					prevTasks.map(task => (task._id === _id ? updatedTask : task))
				)
				toast.success('Task UPDATED successfully! ✨')
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error)
				toast.error('Failed to update task')
			})
	}

	const showToast = (message: string) => {
		toast.success(message)
	}

	const sortedTasks = [...tasks].sort((a, b) =>
		a.done === b.done ? 0 : a.done ? 1 : -1
	)

	return (
		<div className='pt-10 mx-auto text-center max-w-[500px]'>
			<h1 className='mb-6 text-4xl'>To-Do Planner</h1>
			<TaskStatus tasks={tasks} />
			<CreateTaskInput onCreate={addTask} />
			<TasksList
				tasks={sortedTasks}
				onToggleDone={toggleTaskDone}
				onDelete={deleteTask}
				onShowToast={showToast}
				onUpdate={updateTask}
			/>
			<ToastContainer />
		</div>
	)
}

export default TodoList
