const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const copyEmailButton = document.querySelector("[data-copy-email]");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.getAttribute("data-copy-email");
    const status = document.querySelector(".copy-status");

    try {
      await navigator.clipboard.writeText(email);
      if (status) {
        status.textContent = "Email copied.";
      }
    } catch {
      if (status) {
        status.textContent = email;
      }
    }
  });
}
