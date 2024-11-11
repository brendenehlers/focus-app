import Task from '../data/Task'
import TaskItem from './TaskItem'

type Props = {
	task: Task
	isFocused: boolean
	orientation: 'row' | 'col'

	onFocusTask: (task: Task) => void
	onRemoveFocus: () => void
	onFinishTask: (task: Task) => void
	onUpdate: (task: Task) => void
	onDeleteTask: (task: Task) => void
}
const FocusedTask: React.FC<Props> = (props) => {
	return (
		<div className='shadow-lg px-8 py-4 border border-grey-50 rounded-md'>
			<h1 className='text-lg text-center font-bold'>Focused Task</h1>
			<div className='mt-1 mb-2 border  rounded' />
			<TaskItem {...props} />
		</div>
	)
}

export default FocusedTask
