const Button: React.FC<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
> = (props) => {
	return (
		<button
			className={'appearance-none bg-slate-50 border border-gray-400 rounded-md shadow-md box-border text-slate-900 inline-block text-sm font-medium px-4 py-1 align-middle whitespace-nowrap break-words hover:bg-slate-200 hover:transition-colors'.concat(
				props.className || ''
			)}
			{...props}
		/>
	)
}

export default Button
