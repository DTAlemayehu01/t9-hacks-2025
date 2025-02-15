//I personally think this one is a bit trivial but whatever
function getPasswordCharSetSize(password) {
	let charSets = {
		lowercase: "abcdefghijklmnopqrstuvwxyz",
		uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		numbers: "0123456789",
		special: "!@#$%^&*()-_=+[]{}|;:'\",.<>?/",
	};

	let poolSize = 0;
	let usedSets = new Set();

	for (let char of password) {
		for (let [key, chars] of Object.entries(charSets)) {
			if (chars.includes(char)) {
				usedSets.add(key);
			}
		}
	}

	for (let set of usedSets) {
		poolSize += charSets[set].length;
	}

	return poolSize;
}

function passwordEntropy(password) {
	let length = password.length;
	if (length === 0) return 0;

	let poolSize = getPasswordCharSetSize(password);
	return Math.min(100, length * Math.log2(poolSize));
}
