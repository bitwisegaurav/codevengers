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
        localStorage.setItem("theme", theme);
        document.body.classList.add(theme);
      }
    const frame = document.body.querySelector('iframe');
    frame.contentWindow.postMessage("toggleTheme", window.location.origin);

}

// themeBtns.forEach(themeBtn => {
    themeBtn.addEventListener("click", ()=>{
        themeTest();
        console.log("test");
        themeBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
    });
// })
