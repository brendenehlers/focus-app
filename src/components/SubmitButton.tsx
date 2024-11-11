import Button from './Button'

const SubmitButton: React.FC<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
> = (props) => (
	<Button
		{...props}
		className={''.concat(
			'border-green-600 bg-green-600 text-slate-100 hover:bg-green-700 hover:border-green-700',
			' ',
			props.className || ''
		)}
	></Button>
)

export default SubmitButton
