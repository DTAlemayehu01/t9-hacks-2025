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
	"huffmandEncodingStrengthLevelText"
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

// Load modal upon DOM setup
document.addEventListener("DOMContentLoaded", () => {
	const modal = new bootstrap.Modal(document.getElementById("dynamicModal"));
	const modalTitle = document.getElementById("dynamicModalLabel");
	const modalBody = document.querySelector(".modal-body p");

	document.querySelectorAll(".modal-btn").forEach((button) => {
		button.addEventListener("click", () => {
			// Get data attributes
			const title = button.dataset.title;
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
	scores = {
		shannonEntropyScore: shannonRatio(password),
		passwordEntropyScore: passwordEntropy(password),
		sequenceAlignmentScore: 0, // To-Do
		// huffmanEncodingScore: encodePw(password), // To-Do
	};

	return scores;
}

function updateUI(analysis) {
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

	// Update Overall Strength Bar
	let overallScore = 0;
	for (const [scoreName, score] of Object.entries(analysis))
		overallScore += score;
	overallScore /= 4;
	overallStrengthLevelText.innerHTML = getStrengthLevel(overallScore);
	overallStrengthLevelText.style.color = getBarColor(overallScore);
	overallStrengthBar.style.width = `${overallScore}%`;
	overallStrengthBar.style.backgroundColor = getBarColor(overallScore);
}

function getBarColor(score) {
	if (score < 20) return vulnerableColor;
	if (score < 40) return weakColor;
	if (score < 60) return moderateColor;
	if (score < 80) return strongColor;
	return veryStrongColor;
}

function getStrengthLevel(score) {
	if (score == 0) return "";
	if (score < 20) return "Vulnerable";
	if (score < 40) return "Weak";
	if (score < 60) return "Moderate";
	if (score < 80) return "Strong";
	return "Very Strong";
}
