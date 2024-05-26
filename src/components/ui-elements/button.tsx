"use client";

export default function Button({
	text,
	onClick,
	onClickParams = [],
}: Readonly<ButtonProps>) {
	return (
		<button
			type="button"
			onClick={() => {
				onClick(...onClickParams);
			}}
		>
			{text}
		</button>
	);
}

interface ButtonProps {
	text: string;
	onClick: (...params: any[]) => any;
	onClickParams?: any[];
}
