import { useState } from 'react'

import Button from './Button'

type Props = {
	onSubmit: (name: string, priority: number) => void
}
const NewTaskBox: React.FC<Props> = ({ onSubmit }) => {
	const [name, setName] = useState('')
	const [priority, setPriority] = useState(0)

	return (
		<>
			<input
				type='text'
				placeholder='Task name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type='number'
				placeholder='Priority'
				value={priority}
				onChange={(e) => setPriority(parseInt(e.target.value))}
			/>
			<Button onClick={() => onSubmit(name, priority)}>Submit</Button>
		</>
	)
}

export default NewTaskBox
