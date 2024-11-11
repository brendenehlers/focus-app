import { useState, useEffect } from 'react'
import FocusedTask from './components/FocusedTask'
import TaskItem from './components/TaskItem'
import Task from './data/Task'
import NewTaskBox from './components/NewTaskBox'
import Button from './components/Button'
import { useLocalStorage } from '@uidotdev/usehooks'
import './index.css'

const DEFAULT_TASKS = [
	{
		id: 1,
		name: 'test 1',
		priority: 1,
		done: false,
		deleted: false,
	},
	{
		id: 2,
		name: 'test 2',
		priority: 1,
		done: false,
		deleted: false,
	},
]

const App: React.FC = () => {
	const [focusedTaskId, setFocusedTaskId] = useLocalStorage<number | undefined>(
		'focusedIndex',
		undefined
	)
	const [tasks, setTasks] = useLocalStorage<Array<Task>>('tasks', DEFAULT_TASKS)
	const [newTaskBoxOpen, setNewTaskBoxOpen] = useState(false)

	const handleFocusTask = (task: Task) => {
		setFocusedTaskId(tasks.find((t) => t.id === task.id)?.id)
	}

	const handleRemoveFocus = () => setFocusedTaskId(undefined)

	const handleFinishTask = (task: Task) => {
		if (focusedTaskId != null && focusedTaskId === task.id) {
			setFocusedTaskId(undefined)
		}
		handleUpdateTask({
			...task,
			done: true,
		})
	}

	const selectRandomTask = () => {
		const applicableTasks = tasks
			.filter((t) => !t.done)
			.filter((t) => !t.deleted)
			// don't select the already focused task
			.filter((t) => (focusedTaskId != null ? focusedTaskId !== t.id : true))
			.flatMap((task) =>
				Array.from({ length: Math.max(task.priority, 1) }, () => task)
			)
		const randomTask =
			applicableTasks[Math.floor(Math.random() * applicableTasks.length)]
		setFocusedTaskId(tasks.find((t) => t.id === randomTask.id)?.id)
	}

	const toggleNewTaskBox = () => setNewTaskBoxOpen((prev) => !prev)

	const handleCreateNewTask = (name: string, priority: number) => {
		setTasks(
			[
				{
					id: Math.max(...tasks.map((t) => t.id)) + 1,
					name,
					priority,
					done: false,
					deleted: false,
				},
			].concat(tasks || [])
		)
		setNewTaskBoxOpen(false)
	}

	const handleUpdateTask = (task: Task) => {
		setTasks((prev) => {
			const index = prev?.findIndex((t) => t.id === task.id)
			if (index == null || index === -1) return prev
			const cur = [...prev]
			cur[index] = task
			return cur
		})
	}

	const handleDeleteTask = (task: Task) => {
		if (focusedTaskId === task.id) {
			setFocusedTaskId(undefined)
		}
		setTasks((prev) => {
			const index = prev.findIndex((t) => t.id === task.id)
			if (index === -1) return prev
			const cur = [...prev]
			cur.splice(index, 1)
			return cur
		})
	}

	useEffect(() => {
		// if focused task is finished, clear it
		if (focusedTaskId) {
			if (
				tasks
					.filter((t) => t.done)
					.filter((t) => !t.deleted)
					.find((t) => t.id === focusedTaskId)
			) {
				setFocusedTaskId(undefined)
				return
			}
		}
	}, [focusedTaskId, setFocusedTaskId, tasks])

	return (
		<div className='w-full flex flex-col items-center'>
			<main className='max-w-prose w-full flex flex-col items-center'>
				<h1 className='text-2xl m-8 bold font-bold'>Focus App</h1>
				{focusedTaskId != null && (
					<section className='mb-4'>
						<FocusedTask
							task={tasks.find((task) => task.id === focusedTaskId)!}
							isFocused={true}
							orientation='col'
							onFocusTask={handleFocusTask}
							onRemoveFocus={handleRemoveFocus}
							onFinishTask={handleFinishTask}
							onUpdate={handleUpdateTask}
							onDeleteTask={handleDeleteTask}
						/>
					</section>
				)}
				<section className='w-full'>
					<h2 className='text-lg text-center font-bold mb-1'>
						{focusedTaskId == null ? 'Tasks' : 'Other Tasks'}
					</h2>
					<section className='flex flex-row justify-center gap-2'>
						<Button onClick={selectRandomTask}>Random Task</Button>
						<Button onClick={toggleNewTaskBox}>
							{newTaskBoxOpen ? 'Close' : 'New task'}
						</Button>
					</section>
					<section>
						{newTaskBoxOpen && <NewTaskBox onSubmit={handleCreateNewTask} />}
					</section>
					{tasks
						.filter((task) => !task.done)
						.filter((task) => !task.deleted)
						.filter((task) =>
							focusedTaskId != null ? focusedTaskId !== task.id : true
						)
						.map((task, index, arr) => (
							<div className='my-2'>
								<TaskItem
									key={task.id}
									task={task}
									isFocused={
										focusedTaskId != null ? task.id === focusedTaskId : false
									}
									orientation='row'
									onFocusTask={handleFocusTask}
									onRemoveFocus={handleRemoveFocus}
									onFinishTask={handleFinishTask}
									onUpdate={handleUpdateTask}
									onDeleteTask={handleDeleteTask}
								/>
								{index !== arr.length - 1 && (
									<div className='mt-2 border-b-2 border-gray-700' />
								)}
							</div>
						))}
				</section>
			</main>
		</div>
	)
}

export default App
