const problem = document.getElementById("problem");
const details = document.getElementById("details");
const output = document.getElementById("output");

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const clearBtn = document.getElementById("clear");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const counter = document.getElementById("counter");
const privacyStatus = document.getElementById("privacyStatus");

const checks = document.querySelectorAll(
  '.check input[type="checkbox"]'
);


// -------------------------
// Progress
// -------------------------

function updateProgress() {
  let completed = 0;

  checks.forEach((check) => {
    if (check.checked) {
      completed++;
    }
  });

  if (details.value.trim().length > 20) {
    completed++;
  }

  const total = checks.length + 1;
  const percent = Math.round((completed / total) * 100);

  progressText.textContent = percent + "%";
  progressBar.style.width = percent + "%";
}

checks.forEach((check) => {
  check.addEventListener("change", updateProgress);
});

details.addEventListener("input", () => {
  counter.textContent = `${details.value.length} / 1200`;
  checkPrivacy();
  updateProgress();
});


// -------------------------
// Sensitive information check
// -------------------------

const sensitivePatterns = [
  /password/i,
  /passwd/i,
  /\botp\b/i,
  /one[- ]?time password/i,
  /recovery code/i,
  /session token/i,
  /access token/i,
  /\bcookie\b/i,
  /\bsecret\b/i
];

function containsSensitiveInformation(text) {
  return sensitivePatterns.some((pattern) =>
    pattern.test(text)
  );
}

function checkPrivacy() {
  const text = details.value;

  if (containsSensitiveInformation(text)) {
    privacyStatus.textContent =
      "⚠️ Sensitive information detected. Remove it before generating.";

    privacyStatus.style.color = "#ffb4b4";
  } else {
    privacyStatus.textContent =
      "🔒 Your text stays in your browser.";

    privacyStatus.style.color = "";
  }
}


// -------------------------
// Generate support draft
// -------------------------

generateBtn.addEventListener("click", () => {

  const description = details.value.trim();

  if (!description) {
    alert("Please describe what happened first.");
    details.focus();
    return;
  }

  if (containsSensitiveInformation(description)) {
    alert(
      "Sensitive information detected.\n\n" +
      "Please remove passwords, OTPs, recovery codes, " +
      "tokens, cookies, or secrets before generating the draft."
    );
    return;
  }

  const selectedProblem =
    problem.options[problem.selectedIndex].text;

  const draft = `Hello Support
