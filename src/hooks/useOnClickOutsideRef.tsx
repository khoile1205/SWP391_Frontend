import { useEffect, useRef, MutableRefObject } from "react";

export function useOnClickOutsideRef<T extends HTMLDivElement>(
	callback: () => void,
	initialValue: T | null = null
): MutableRefObject<T | null> {
	const elementRef = useRef<T | null>(initialValue);

	useEffect(() => {
		function handler(event: MouseEvent) {
			if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
				callback();
			}
		}

		window.addEventListener("click", handler);
		return () => window.removeEventListener("click", handler);
	}, [callback]);

	return elementRef;
}
