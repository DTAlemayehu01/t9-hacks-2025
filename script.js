const passwordInput = document.getElementById("passwordInput");
const strengthBar = document.getElementById("strengthBar");
const primaryColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--primary");
const successColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--success");
const warningColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--warning");
const dangerColor = window
	.getComputedStyle(document.body)
	.getPropertyValue("--danger");

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
	console.log(strengthBar);
	// Update strength bar details
	strengthBar.style.width = `${analysis.score}%`;
	strengthBar.style.backgroundColor = getBarColor(analysis.score);
}

function getBarColor(score) {
	if (score < 33) return dangerColor;
	if (score < 67) return warningColor;
	return successColor;
}
