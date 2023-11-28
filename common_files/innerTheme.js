let theme = localStorage.getItem("theme");
window.addEventListener("message", (event) => {
  if (event.origin === window.location.origin && event.data === "toggleTheme") {
    toggleTheme();
    console.log("pohoch rha h");
  }
});

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
    //   themeBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (!theme) {
    theme = "dark";
    document.body.classList.remove("light");
  } else {
    document.body.classList.add(theme);
  }
});
