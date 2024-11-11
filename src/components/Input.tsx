const Input: React.FC<
	React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	>
> = (props) => {
	return (
		<input
			{...props}
			className={''.concat(
				'px-3 py-1 text-sm text-slate-900 align-middle bg-white bg-no-repeat border-2 border-slate-100 rounded-md shadow-sm transition-shadow hover:shadow-md focus:shadow-md focus:border-blue-400 focus:border-2 focus:shadow-blue-200 outline-none',
				' ',
				props.className || ''
			)}
		/>
	)
}

export default Input
