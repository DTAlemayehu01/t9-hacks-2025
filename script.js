const passwordInput = document.getElementById("passwordInput");
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

// Close model on ESC key
document.addEventListener("keydown", (e) => {
	if (
		e.key === "Escape" &&
		document.body.classList.contains("modal-active")
	) {
		toggleInfoModal();
	}
});

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
	// Implement password rating algorithm here
	return { score: password.length * 10 };
}

function updateUI(analysis) {
	// Update strength bar details
	overallStrengthLevelText.innerHTML = getStrengthLevel(analysis.score);
	overallStrengthLevelText.style.color = getBarColor(analysis.score);
	overallStrengthBar.style.width = `${analysis.score}%`;
	overallStrengthBar.style.backgroundColor = getBarColor(analysis.score);
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

function toggleInfoModal(modalID) {
	const modal = document.getElementById(modalID);
	modal.classList.toggle("modal-active");
	toggleInfoModalOverlay();
	document.getElementById("passwordInput").blur(); // Remove focus from password field
}

function toggleInfoModalOverlay() {
	infom.classList.toggle("modal-active");
}
