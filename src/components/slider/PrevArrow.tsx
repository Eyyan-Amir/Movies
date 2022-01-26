interface sliderProps {
	className: string;
	onClick?: () => void;
}
export function PrevArrow({ className, onClick }: sliderProps) {
	return <div className={className} onClick={onClick} />;
}
