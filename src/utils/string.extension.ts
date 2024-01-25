const transformEmail = (email: string) => {
	const [username, domain] = email.split("@");
	const truncatedLength = Math.min(4, username.length); // Ensure we truncate to at most 4 characters
	const truncatedUsername =
		username.slice(0, truncatedLength) + "*".repeat(username.length - truncatedLength);
	return `${truncatedUsername}@${domain}`;
};

const mergeToken = (token: string) => {
	return token.split(" ").join("+");
};

export { transformEmail, mergeToken };
