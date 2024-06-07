"use client";

import { useRef, useEffect, KeyboardEventHandler } from "react";
import { useFormStatus } from "react-dom";

function PinInputBox({
	index,
	label,
}: Readonly<{
	index: number;
	label: string;
}>) {
	const inputRef = useRef<HTMLInputElement>(null);

	const setCursorToEnd = () => {
		const input = inputRef.current;
		if (input) {
			const length = input.value.length;
			input.setSelectionRange(length, length);
		}
	};

	useEffect(() => {
		const input = inputRef.current;
		if (input) {
			// Add event listeners for various events that can focus the input
			input.addEventListener("focus", setCursorToEnd);
			input.addEventListener("click", setCursorToEnd);
			input.addEventListener("keydown", setCursorToEnd);
			input.addEventListener("touchstart", setCursorToEnd);

			// Clean up event listeners on component unmount
			return () => {
				input.removeEventListener("focus", setCursorToEnd);
				input.removeEventListener("click", setCursorToEnd);
				input.removeEventListener("keydown", setCursorToEnd);
				input.removeEventListener("touchstart", setCursorToEnd);
			};
		}
	}, []);

	const inputHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;

		// Allow only digit keys
		if (!/\d/.test(e.key)) {
			target.value = target.value.replace(/\D/g, "");
			return;
		} else {
			target.value = e.key;
		}

		// Move to the next field if digit is entered
		const fieldIntIndex = parseInt(target.name.split("-")[1], 10);
		const nextField = document.querySelector<HTMLInputElement>(
			`input[name=code-${fieldIntIndex + 1}]`
		);
		nextField?.focus();

		// Check if all fields are filled
		setTimeout(() => {
			const allFilled = Array.from(
				document.querySelectorAll<HTMLInputElement>("input[name^=code-]")
			).every((input) => input.value.length === 1);

			if (allFilled) {
				document.getElementById("submit-master-password")?.click();
			}
		}, 100);
	};

	const backSpaceHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;

		if (e.key !== "Backspace" || target.value !== "") {
			return;
		}
		e.preventDefault();
		const fieldIntIndex = parseInt(target.name.split("-")[1], 10);
		const previousField = document.querySelector<HTMLInputElement>(
			`input[name=code-${fieldIntIndex - 1}]`
		);
		previousField?.focus();
	};

	return (
		<div>
			<label htmlFor={`code-${index}`} className="sr-only">
				{label}
			</label>
			<input
				type="password"
				maxLength={1}
				name={`code-${index}`}
				className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
				required
				onKeyUp={inputHandler}
				onKeyDown={backSpaceHandler}
				ref={inputRef}
				pattern="[0-9]"
				inputMode="numeric"
			/>
		</div>
	);
}

export default function PinInput({
	mode,
}: Readonly<{ mode: "create" | "verify" }>) {
	const { pending } = useFormStatus();

	const pinInputLabels = [
		"First code",
		"Second code",
		"Third code",
		"Fourth code",
		"Fifth code",
		"Sixth code",
	];

	let message: string;
	if (mode === "create") {
		message = "Enter master code. This will be required on every login.";
	} else {
		message = "Enter your 6 digit master code.";
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex flex-wrap mb-2 space-x-2 rtl:space-x-reverse">
				{pinInputLabels.map((label: string, i: number) => (
					<PinInputBox index={i + 1} label={label} key={`code-${i + 1}`} />
				))}
				<input type="submit" id="submit-master-password" hidden />
			</div>
			<p
				id="helper-text-explanation"
				className="mt-2 text-sm text-gray-500 dark:text-gray-400"
			>
				{pending ? "Signing you in..." : message}
			</p>
		</div>
	);
}
