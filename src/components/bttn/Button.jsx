export const Button = ({
	text,
	fontSize,
	onClick,
	className,
	borderRadius,
	onSubmit,
	minWidth,
}) => {
	const buttonStyle = {
		fontSize: fontSize + 'px',
		borderRadius: `${borderRadius}px`,
		minWidth: `${minWidth}vw`,
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
