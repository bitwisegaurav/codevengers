let theme = localStorage.getItem("theme");
window.addEventListener("message", (event) => {
  if (event.data.msg === "toggleTheme") {
    console.log("pohoch rha h");
    setTheme(event.data.theme);
  }
});

function setTheme(themevalue) {
  console.log("called");
  // theme = localStorage.getItem("theme");
  console.log(themevalue);
  if (!themevalue) {
    themevalue = "dark";
    document.body.classList.remove("light");
  } else {
    if(themevalue === "light") document.body.classList.remove("dark");
    if(themevalue === "dark") document.body.classList.remove("light");
  }
  document.body.classList.add(themevalue);
}

window.addEventListener("DOMContentLoaded", ()=>{
  theme = localStorage.getItem("theme");
  setTheme(theme);
});