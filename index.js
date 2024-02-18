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

function setTheme() {
  theme = localStorage.getItem("theme");
  if (!theme) {
    theme = "dark";
    localStorage.setItem("theme", theme);
    document.body.classList.remove("light");
  }
  if (theme === "light") document.body.classList.remove("dark");
  document.body.classList.add(theme);
  themeBtn.innerHTML = theme === "light" ? "🌙" : "☀️";
}

async function getData() {
  const res = await fetch("courses.json");
  const data = await res.json();
  // setData(data);
  return data;
}

function setData(data){
  const outerBox = document.querySelector(".boxes");

  let content = "";

  data.forEach(course => {
    content += `<a href="${course.url ? course.url : `languages/outer.html?lang=${course.name}`}" class="box" id="${course.name}">
    <div class="langlogo">
      <img src="images/${course.image}" alt="${course.name} logo">
    </div>
    <div class="langname">${course.name}</div>
  </a>`
  })

  outerBox.innerHTML = content;
}

window.addEventListener("DOMContentLoaded", async () => {
  setTheme();

  const data = await getData();
  console.log(data);

  setData(data);
});

themeBtn.addEventListener("click", toggleTheme);