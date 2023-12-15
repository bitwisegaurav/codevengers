const frame = document.querySelector('#frame');
const title = document.querySelector('#title');
let themeBtn;
let theme = localStorage.getItem("theme");
const path = new URLSearchParams(window.location.search);
const roadmapData = {
    webdevelopment : {
        name : "Web Development",
        markdown: "webdev",
        class: "roadmap img-center",
        image: ['webdev.jpeg'],
    },
    nodejs : {
        name : "Node Js",
        markdown: "nodejs",
        class: "roadmap img-center",
        image: [],
    }
}

function loadData(){
    const roadmap = path.get('roadmap');
    if(roadmap){
        const data = roadmapData[roadmap];
        if(data){
            title.innerHTML = data.name + " Roadmap";
            let images = '';
            data.image.forEach(image => {
                images += `<div class="${data.class}"><img src="../examples/roadmaps/${image}" alt="${data.name}"></div>`;
            });
            const imagesBox = document.createElement('div');
            imagesBox.innerHTML = images;
            title.insertAdjacentElement("afterend", imagesBox);
            getData(data.markdown);
        }
    }
}

function loadHeader(){
    fetch("../components/header.html").then(res => {
        return res.text();
    }).then(res => {
        const navbar = document.createElement("nav");
        navbar.innerHTML = res;
        document.querySelector("#main").insertAdjacentElement("beforebegin", navbar);
        themeBtn = document.querySelector('#theme');
        themeBtn.addEventListener("click", toggleTheme);
        loadTheme()
        loadData();
    }).catch (err => {
        console.log(err);
    })
}

function loadTheme(){
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

window.addEventListener("load", () => {
        loadHeader();
});

function getData(markdown){
    fetch(`${markdown}.md`).then(res => {
        return res.text();
    }).then(res => {
        const data = res;
        frame.innerHTML = marked(data);
        // console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
}

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