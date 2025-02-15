function shannonEntropy(password) {
	if (!password) return 0;

	let length = password.length;
	let charCounts = {};

	// Count character frequencies
	for (let char of password) {
		charCounts[char] = (charCounts[char] || 0) + 1;
	}

	// Compute entropy
	let entropy = 0;
	for (let char in charCounts) {
		let p = charCounts[char] / length;
		entropy -= p * Math.log2(p);
	}

	return entropy;
}

function maxShannonEntropyofLengthN(n) {
	let p = 1 / n; // uniform distribution for each character
	let entropyPerChar = -p * Math.log2(p);
	return n * entropyPerChar;
}

function shannonRatio(password) {
	let entropy = shannonEntropy(password);
	let theoreticalEntropy = maxShannonEntropyofLengthN(password.length);

	let effectiveRatio = entropy / theoreticalEntropy;
	return effectiveRatio;
}
