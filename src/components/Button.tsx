const Button: React.FC<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
> = (props) => {
	return (
		<button
			{...props}
			className={''.concat(
				'appearance-none bg-slate-50 border-2 border-gray-400 rounded-md shadow-sm box-border text-slate-900 inline-block text-sm font-medium px-4 py-1 align-middle whitespace-nowrap break-words transition-shadow hover:bg-slate-200 hover:shadow-md focus:bg-slate-300',
				' ',
				props.className || ''
			)}
		/>
	)
}

export default Button
