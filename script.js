const problem = document.getElementById("problem");
const details = document.getElementById("details");
const output = document.getElementById("output");

document.getElementById("generate").addEventListener("click", () => {
  const labels = {
    hacked: "I believe my account may have been compromised.",
    login: "I am unable to access my account.",
    email: "The linked account or email details appear to have changed.",
    lost: "I have lost access to the account linked to my game account.",
    other: "I am experiencing an account-access problem."
  };

  const description = details.value.trim() || "I would like help verifying and recovering access to my account.";
  output.value =
`Hello Support Team,

${labels[problem.value]}

Details:
${description}

I am the legitimate account owner and can provide appropriate ownership information through the official support process.

Please let me know what information is required to verify ownership and restore access.

Thank you.`;
});

document.getElementById("copy").addEventListener("click", async () => {
  if (!output.value) return;
  await navigator.clipboard.writeText(output.value);
  document.getElementById("copy").textContent = "Copied ✓";
  setTimeout(() => document.getElementById("copy").textContent = "Copy draft", 1500);
});
