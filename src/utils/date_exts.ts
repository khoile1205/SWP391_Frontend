export function getTimeDifferenceString(inputDate: Date): string {
	const timeDifference = new Date().getTime() - inputDate.getTime();

	const seconds = Math.floor(timeDifference / 1000);
	if (seconds < 60) {
		return `${seconds} seconds ago`;
	}

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		return `${minutes} minutes ago`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours} hours ago`;
	}

	const days = Math.floor(hours / 24);
	if (days < 30) {
		return `${days} days ago`;
	}

	const months = Math.floor(days / 30);
	if (months < 12) {
		return `${months} months ago`;
	}

	const years = Math.floor(days / 365);
	return `${years} years ago`;
}

export function getFormattedDateString(inputDate: Date): string {
	return new Date(inputDate).toLocaleDateString("vi-VN");
}

export function getFormattedDateTimeString(inputDate: Date): string {
	return new Date(inputDate).toLocaleString("vi-VN");
}

export function isBetween({
	startDate,
	currentDate,
	endDate,
}: {
	startDate: Date;
	currentDate: Date;
	endDate: Date;
}): boolean {
	return (
		new Date(startDate).getTime() <= new Date(currentDate).getTime() &&
		new Date(endDate).getTime() >= new Date(currentDate).getTime()
	);
}

export function isInRange({
	startDateCheck,
	startRangeDate,
	endDateCheck,
	endRangeDate,
}: {
	startRangeDate: Date;
	endRangeDate: Date;
	startDateCheck: Date;
	endDateCheck: Date;
}): boolean {
	return (
		new Date(startDateCheck).getTime() >= new Date(startRangeDate).getTime() &&
		new Date(endDateCheck).getTime() <= new Date(endRangeDate).getTime()
	);
}
