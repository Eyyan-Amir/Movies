import React from "react";

interface sliderProps {
	className: string;
	onClick?: () => void;
}
export function NextArrow({ className, onClick }: sliderProps) {
	return <div className={className} onClick={onClick} />;
}
