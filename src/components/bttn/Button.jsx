export const Button = ({
	text,
	fontSize,
	onClick,
	className,
	borderRadius,
	onSubmit,
	minWidth,
	padding,
}) => {
	const buttonStyle = {
		fontSize: fontSize + 'px',
		borderRadius: `${borderRadius}px`,
		minWidth: `${minWidth}vw`,
		padding: `${padding}px`,
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
