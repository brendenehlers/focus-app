import { useState } from 'react'

import Task from '../data/Task'
import Button from './Button'
import Input from './Input'
import SubmitButton from './SubmitButton'

type Orientation = 'row' | 'col'

type Props = {
	task: Task
	isFocused: boolean
	orientation: Orientation

	onFocusTask: (task: Task) => void
	onRemoveFocus: () => void
	onFinishTask: (task: Task) => void
	onUpdate: (task: Task) => void
	onDeleteTask: (task: Task) => void
}
const TaskItem: React.FC<Props> = (props) => {
	const [editing, setEditing] = useState(false)

	const toggleEditing = () => setEditing(!editing)

	const handleSubmit = (task: Task) => props.onUpdate(task)

	return (
		<>
			{editing ? (
				<EditTaskItem
					onClose={toggleEditing}
					onSubmit={handleSubmit}
					{...props}
				/>
			) : (
				<ViewTaskItem onEdit={toggleEditing} {...props} />
			)}
		</>
	)
}

type ViewProps = {
	onEdit: () => void
}
const ViewTaskItem: React.FC<Props & ViewProps> = ({
	task,
	isFocused,
	orientation,
	onFocusTask,
	onRemoveFocus,
	onFinishTask,
	onEdit,
	onDeleteTask,
}) => (
	<TaskItemWrapper orientation={orientation}>
		<h2 className='font-md font-semibold'>{task.name}</h2>
		<p
			className={`text-sm text-gray-700 ${
				orientation === 'row' ? 'mr-auto' : ''
			}`}
		>
			Priority: {task.priority}
		</p>
		{orientation === 'row' ? (
			<div className='float-end flex flex-row gap-1'>
				<div className='flex flex-col gap-1'>
					<Button onClick={() => onFinishTask(task)}>Finish</Button>
					{isFocused ? (
						<Button onClick={onRemoveFocus}>Unfocus</Button>
					) : (
						<Button onClick={() => onFocusTask(task)}>Focus</Button>
					)}
				</div>
				<div className='flex flex-col gap-1'>
					<Button onClick={onEdit}>Edit</Button>
					<Button onClick={() => onDeleteTask(task)}>Delete</Button>
				</div>
			</div>
		) : (
			<div>
				<div className='float-end flex flex-row gap-2'>
					<Button onClick={() => onFinishTask(task)}>Finish</Button>
					{isFocused ? (
						<Button onClick={onRemoveFocus}>Unfocus</Button>
					) : (
						<Button onClick={() => onFocusTask(task)}>Focus</Button>
					)}
					<Button onClick={onEdit}>Edit</Button>
					<Button onClick={() => onDeleteTask(task)}>Delete</Button>
				</div>
			</div>
		)}
	</TaskItemWrapper>
)

type EditProps = {
	onSubmit: (task: Task) => void
	onClose: () => void
}
const EditTaskItem: React.FC<Props & EditProps> = ({
	task,
	orientation,
	onSubmit,
	onClose,
}) => {
	const [name, setName] = useState(task.name)
	const [priority, setPriority] = useState(task.priority)

	const handleSubmit = () => {
		onSubmit({
			...task,
			name,
			priority,
		})
		onClose()
	}

	const handleCancel = () => {
		setName(task.name)
		setPriority(task.priority)
		onClose()
	}

	return (
		<TaskItemWrapper orientation={orientation}>
			<Input
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Input
				className='mr-auto'
				type='number'
				value={priority}
				onChange={(e) => setPriority(parseInt(e.target.value))}
			/>
			<Button onClick={handleCancel}>Cancel</Button>
			<SubmitButton onClick={() => handleSubmit()}>Submit</SubmitButton>
		</TaskItemWrapper>
	)
}

type TaskItemWrapperProps = {
	orientation: Orientation
}
const TaskItemWrapper: React.FC<
	React.PropsWithChildren<TaskItemWrapperProps>
> = ({ children, orientation }) => (
	<article
		className={`flex flex-${orientation} gap-2 items-center w-full px-4 py-2`}
	>
		{children}
	</article>
)

export default TaskItem
