const themeBtn = document.querySelector('.themeBtn');
let theme = localStorage.getItem("theme");

function themeTest () {
    theme = localStorage.getItem("theme");
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
    }
    localStorage.setItem("theme", theme);
    document.body.classList.add(theme);
    themeBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
    const frame = document.body.querySelector('iframe');
    frame.contentWindow.postMessage({msg: "toggleTheme", theme}, "*");
}

function setListenersTheme () {
    let themeBtn = document.querySelector('#theme');
    console.log("setListenersTheme", themeBtn);
    themeBtn.addEventListener("click", ()=>{
        themeTest();
        console.log("clicked");
        themeBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
    });
}

const setTheme = ()=>{
  theme = localStorage.getItem("theme");
  // console.log(theme);
  if(!theme){
    theme = "dark";
    localStorage.setItem("theme", theme);
    document.body.classList.remove("light")
  } else {
    if(theme === "light") document.body.classList.remove("dark");
    if(theme === "dark") document.body.classList.remove("light");
  }
  document.body.classList.add(theme);
  themeBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
}

window.addEventListener("DOMContentLoaded", ()=>{
  setTheme();
  setListenersTheme();
})