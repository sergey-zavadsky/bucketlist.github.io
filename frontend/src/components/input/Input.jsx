export const Input = ({
	onKeyUp,
	value,
	placeholder = '',
	className,
	onChange,
	defaultValue,
	type = 'text',
	onFocus,
	onBlur,
}) => (
	<input
		value={value}
		placeholder={placeholder}
		type={type}
		onKeyUp={onKeyUp}
		className={className}
		onChange={onChange}
		defaultValue={defaultValue}
		onFocus={onFocus}
		onBlur={onBlur}
	/>
);
