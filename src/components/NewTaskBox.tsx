import { useState } from 'react'

import Input from './Input'
import SubmitButton from './SubmitButton'

type Props = {
	onSubmit: (name: string, priority: number) => void
}
const NewTaskBox: React.FC<Props> = ({ onSubmit }) => {
	const [name, setName] = useState('')
	const [priority, setPriority] = useState(0)

	return (
		<>
			<article className='flex flex-row gap-2 items-center w-full px-4 py-2'>
				<Input
					type='text'
					placeholder='Task name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					type='number'
					placeholder='Priority'
					className='mr-auto'
					value={priority}
					onChange={(e) => setPriority(parseInt(e.target.value))}
				/>
				<SubmitButton onClick={() => onSubmit(name, priority)}>
					Create
				</SubmitButton>
			</article>
			<div className='mt-2 border-b-2 border-gray-700' />
		</>
	)
}

export default NewTaskBox
