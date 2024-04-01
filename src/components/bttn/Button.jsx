export const Button = ({
	text,
	fontSize,
	onClick,
	className,
	borderRadius,
	onSubmit,
}) => {
	const buttonStyle = {
		fontSize: fontSize + 'px',
		borderRadius: `${borderRadius}px`,
	};

	return (
		<button
			style={buttonStyle}
			className={className}
			onClick={onClick}
			onSubmit={(e) => onSubmit}
			type="submit"
		>
			{text}
		</button>
	);
};

Button.defaultProps = {
	text: 'Click Me!',
	fontSize: 15,
};
