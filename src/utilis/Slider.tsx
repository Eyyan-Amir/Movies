interface sliderProps {
	className: string;
	style: React.CSSProperties;
	onClick?: () => void;
}

export function NextArrow({ className, style, onClick }: sliderProps) {
	return (
		<div
			className={className}
			style={{ ...style, display: "block", right: "0px" }}
			onClick={onClick}
		/>
	);
}

export function PrevArrow({ className, style, onClick }: sliderProps) {
	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				left: "0px",
				zIndex: 1,
			}}
			onClick={onClick}
		/>
	);
}
