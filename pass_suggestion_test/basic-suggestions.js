// expects string input
// checks text file for common passwords
// false for fail
async function common_password_check(password) {
	const events = require('events');
	const fs = require('fs');
	const readline = require('readline');

	try {
		const rl = readline.createInterface({
			input: fs.createReadStream("../data/common-passwords.txt"),
			crlfDelay: Infinity
		});

		rl.on('line', (line) => {
			if (password == line) {
				console.log(`Password is a common password, make a new one instead!`);
				return false
			}
		});

		await events.once(rl. 'close');

		return true

	} catch {
		console.error(err);
	}
}

// Too Short Check
// false for fail
function common_password_check(password) {
	let pass_len = password.length
	if (pass_len < 8) {
		console.log(`Password is too short for most websites`)
	}
	return pass_len >= 8
}

// Inspired by LUDS Check, From https://www.usenix.org/system/files/conference/usenixsecurity16/sec16_paper_wheeler.pdf
// Common NIST_Entrophy Recs
// Assumes ascii input
// Returns LUDS score
function LUDS_check(password) {
	let score = 0
	let has_special = false
	let has_upper = false
	for (let char of password) {
		let ascii = char.charCodeAt(0);
		if (ascii >= 65 && ascii <= 90) {
			let has_upper = true
		} else if (ascii >= 97 && ascii <= 122) {
			continue
		} else {
			let has_special = true
		} 
	}
	return 6*Number(password.length >= 20) + 6*Number(has_special || has_upper)
}
