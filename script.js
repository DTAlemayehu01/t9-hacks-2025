const passwordInput = document.getElementById("passwordInput");

const shannonEntropyStrengthBar = document.getElementById(
	"shannonEntropyStrengthBar"
);
const shannonEntropyStrengthLevelText = document.getElementById(
	"shannonEntropyStrengthLevelText"
);

const passwordEntropyStrengthBar = document.getElementById(
	"passwordEntropyStrengthBar"
);
const passwordEntropyStrengthLevelText = document.getElementById(
	"passwordEntropyStrengthLevelText"
);

const sequenceAlignmentStrengthBar = document.getElementById(
	"sequenceAlignmentStrengthBar"
);
const sequenceAlignmentStrengthLevelText = document.getElementById(
	"sequenceAlignmentStrengthLevelText"
);

const huffmanEncodingStrengthBar = document.getElementById(
	"huffmanEncodingStrengthBar"
);
const huffmanEncodingStrengthLevelText = document.getElementById(
	"huffmanEncodingStrengthLevelText"
);

const overallStrengthBar = document.getElementById("overallStrengthBar");
const overallStrengthLevelText = document.getElementById(
	"overallStrengthLevelText"
);
const infoModalOverlay = document.getElementById("infoModalOverlay");

const primaryColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--primary");
const veryStrongColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--veryStrong");
const strongColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--strong");
const moderateColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--moderate");
const weakColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--weak");
const vulnerableColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--vulnerable");

passwordInput.addEventListener("input", (e) => {
	const password = e.target.value;
	const analysis = analyzePassword(password);
	updateUI(analysis);
});

// Modals Consts
const base_modal_content = [
	"Measures the 'uniqueness' of the password via the Shannon Entropy metric. Given a string of length n there is some maximal Shannon Entropy score it can have. However a string can reduce it's Shannon Entropy by repeating characters in it's sequence. This metric penalizes passwords that repeat characters. Fun fact, the amount of guesses required to guess a password given a Shannon Entropy is given by 2^H where H is the Shannon Entropy. However, it's important to note that this guess assumes a rudimentary attack methodology.",
	"Given the pool of characters (ASCII) this score is calculated by how many Lowercase, Uppercase, Numbers, and Special characters are used. This score defaults to being minimized and increases as the length and as all 4 types of characters are fully utilized. Eventually, a long enough password will pass this metric even if it's merely a sequence of a single character which makes this metric generally unreliable. However, this metric sees common use in most signup password scorers.",
	"Based on, UK's NCSC stats on most common passwords (i.e. 'password', 'qwerty'). Being more similar to these passwords decreases the score. Similarity to a string is defined as how many string operations (i.e. character inserts, deletes, swaps, etc.) are necessary to transform one string into another.",
	"Measures character rarity via a Huffman Encode of the UK's NCSC's stats on most common passowrds. Sums each characters 'rarity' based on the Huffman Encoding of the respective character. Characters that are more commonly used result in a lower Character Rarity score. Huffman Encoding is an ecoding algorithm that assigns common (shorter) binary sequences to more common characters. Consequently, we can evaluate the Huffman binary sequence as a number instead of string to assign a 'rarity score' to the respective character where a greater number implies a higher rarity.",
];

let modal_content = base_modal_content;

// Load modal upon DOM setup
document.addEventListener("DOMContentLoaded", () => {
	const modal = new bootstrap.Modal(document.getElementById("dynamicModal"));
	const modalTitle = document.getElementById("dynamicModalLabel");
	const modalBody = document.querySelector(".modal-body p");

	document.querySelectorAll(".modal-btn").forEach((button) => {
		button.addEventListener("click", () => {
			// Get data attributes
			const title = button.dataset.title;
			switch (title) {
				case "Character Rarity (Huffman Encoding)":
					button.dataset.content = modal_content[3];
					break;
				case "Commonality with Broken Passwords (Sequence Alignment)":
					button.dataset.content = modal_content[2];
					break;
				case "Length and Variety (Password Entropy)":
					button.dataset.content = modal_content[1];
					break;
				case "Character Uniqueness (Shannon Entropy)":
					button.dataset.content = modal_content[0];
					break;
			}
			const content = button.dataset.content;

			// Update modal content
			modalTitle.textContent = title;
			modalBody.textContent = content;

			// Show modal
			modal.show();
		});
	});
});

function analyzePassword(password) {
	seqAl = actualUsage(password);
	scores = {
		shannonEntropyScore: shannonRatio(password),
		passwordEntropyScore: passwordEntropy(password),
		sequenceAlignmentScore: seqAl[0],
		sequenceAlignmentPassword: seqAl[1],
		huffmanEncodingScore: encodePw(password),
	};

	return scores;
}

function updateUI(analysis) {
	console.log(analysis);
	// Update Shannon Entropy Strength Bar
	shannonEntropyStrengthLevelText.innerHTML = getStrengthLevel(
		analysis.shannonEntropyScore
	);
	shannonEntropyStrengthLevelText.style.color = getBarColor(
		analysis.shannonEntropyScore
	);
	shannonEntropyStrengthBar.style.width = `${analysis.shannonEntropyScore}%`;
	shannonEntropyStrengthBar.style.backgroundColor = getBarColor(
		analysis.shannonEntropyScore
	);
	modal_content[0] =
		base_modal_content[0] +
		`Your Shannon Entropy Score: {analysis.shannonEntropyScore}`;

	// Update Password Entropy Strength Bar
	passwordEntropyStrengthLevelText.innerHTML = getStrengthLevel(
		analysis.passwordEntropyScore
	);
	passwordEntropyStrengthLevelText.style.color = getBarColor(
		analysis.passwordEntropyScore
	);
	passwordEntropyStrengthBar.style.width = `${analysis.passwordEntropyScore}%`;
	passwordEntropyStrengthBar.style.backgroundColor = getBarColor(
		analysis.passwordEntropyScore
	);
	modal_content[1] =
		base_modal_content[1] +
		`Your Password Entropy Score: {analysis.passwordEntropyScore}`;

	// Update Sequence Alignment Strength Bar
	sequenceAlignmentStrengthLevelText.innerHTML = getStrengthLevel(
		analysis.sequenceAlignmentScore
	);
	sequenceAlignmentStrengthLevelText.style.color = getBarColor(
		analysis.sequenceAlignmentScore
	);
	sequenceAlignmentStrengthBar.style.width = `${analysis.sequenceAlignmentScore}%`;
	sequenceAlignmentStrengthBar.style.backgroundColor = getBarColor(
		analysis.sequenceAlignmentScore
	);
	modal_content[2] =
		base_modal_content[2] +
		`Your Password Most Closely Matches: {analysis.sequenceAlignmentScore}`;

	// Update Huffman Encoding Strength Bar
	huffmanEncodingStrengthLevelText.innerHTML = getStrengthLevel(
		analysis.huffmanEncodingScore
	);
	huffmanEncodingStrengthLevelText.style.color = getBarColor(
		analysis.huffmanEncodingScore
	);
	huffmanEncodingStrengthBar.style.width = `${analysis.huffmanEncodingScore}%`;
	huffmanEncodingStrengthBar.style.backgroundColor = getBarColor(
		analysis.huffmanEncodingScore
	);
	modal_content[3] =
		base_modal_content[3] +
		`Your Character Rarity Score: {analysis.huffmanEncodingScore}`;

	// Update Overall Strength Bar
	// Compute Geometric Mean
	let overallScore = 1;
	overallScore *= analysis.shannonEntropyScore;
	overallScore *= analysis.passwordEntropyScore;
	overallScore *= analysis.sequenceAlignmentScore;
	overallScore *= huffmanEncodingScore;
	overallScore = overallScore ** (1 / 8);

	overallStrengthLevelText.innerHTML = getStrengthLevel(overallScore);
	overallStrengthLevelText.style.color = getBarColor(overallScore);
	overallStrengthBar.style.width = `${overallScore}%`;
	overallStrengthBar.style.backgroundColor = getBarColor(overallScore);

	updateSuggestions(analysis);
}

function getSuggestions(analysis) {
	const suggestions = [];

	if (
		analysis.shannonEntropyScore != 0 ||
		analysis.passwordEntropyScore != 0 ||
		analysis.sequenceAlignmentScore != 0 ||
		analysis.huffmanEncodingScore != 0
	) {
		if (analysis.shannonEntropyScore < 60) {
			suggestions.push(
				"❌ Consider using a more diverse set of characters."
			);
		}

		if (analysis.passwordEntropyScore < 60) {
			suggestions.push("❌ Consider using a longer password.");
		}

		if (analysis.sequenceAlignmentScore < 60) {
			suggestions.push(
				"❌ This password is similar to one that has been broken before."
			);
		}

		if (analysis.huffmanEncodingScore < 60) {
			suggestions.push(
				"❌ Consider using more rarely-used characters (e.g. '*', '%', etc.)."
			);
		}
	}

	return suggestions;
}

function updateSuggestions(analysis) {
	const suggestionBox = document.getElementById("suggestionBox");
	const suggestionList = document.getElementById("suggestionList");
	const suggestions = getSuggestions(analysis);

	suggestionList.innerHTML = "";

	if (suggestions.length > 0) {
		suggestions.forEach((suggestion, index) => {
			const li = document.createElement("li");
			li.className = "suggestion-item my-2";

			const hue = (index * 10) % 360;
			li.style.backgroundColor = `hsla(${hue}, 70%, 90%, 0.9)`;
			li.style.borderLeftColor = `hsl(${hue}, 70%, 50%)`;
			li.style.setProperty("--text-color", `hsl(${hue}, 70%, 30%)`);

			li.textContent = suggestion;
			suggestionList.appendChild(li);
		});

		suggestionBox.classList.remove("hidden");
	} else {
		suggestionBox.classList.add("hidden");
	}
}

function getBarColor(score) {
	if (score < 20) return vulnerableColor;
	if (score < 40) return weakColor;
	if (score < 60) return moderateColor;
	if (score < 80) return strongColor;
	return veryStrongColor;
}

function getStrengthLevel(score) {
	if (score === 0) return "";
	if (score < 20) return "Vulnerable";
	if (score < 40) return "Weak";
	if (score < 60) return "Moderate";
	if (score < 80) return "Strong";
	return "Very Strong";
}
