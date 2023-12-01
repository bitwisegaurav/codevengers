const themeBtn = document.querySelector("#theme");
let theme = localStorage.getItem("theme");

function toggleTheme() {
  if (!theme) {
    theme = "dark";
    document.body.classList.remove("light");
  } else {
    if (theme === "light") {
      theme = "dark";
      document.body.classList.remove("light");
    } else {
      theme = "light";
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    document.body.classList.add(theme);
    themeBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  theme = localStorage.getItem("theme");
  if (!theme) {
    theme = "dark";
    localStorage.setItem("theme", theme);
    document.body.classList.remove("light");
  }
  if (theme === "light") document.body.classList.remove("dark");
  document.body.classList.add(theme);
  themeBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
});

themeBtn.addEventListener("click", toggleTheme);