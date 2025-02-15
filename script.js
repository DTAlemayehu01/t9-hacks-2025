const passwordInput = document.getElementById("passwordInput");
const strengthBar = document.getElementById("strengthBar");
const strengthLevelText = document.getElementById("strengthLevelText");
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

passwordInput.addEventListener("input", function (e) {
	const password = e.target.value;
	const analysis = analyzePassword(password);
	updateUI(analysis);
});

function analyzePassword(password) {
	// Implement password rating algorithm here
	return { score: password.length * 10 };
}

function updateUI(analysis) {
	// Update strength bar details
	strengthLevelText.innerHTML = getStrengthLevel(analysis.score);
	strengthLevelText.style.color = getBarColor(analysis.score);
	strengthBar.style.width = `${analysis.score}%`;
	strengthBar.style.backgroundColor = getBarColor(analysis.score);
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
