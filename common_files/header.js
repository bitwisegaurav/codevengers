async function getHeader() {
    const res = await fetch("../components/header.html");
    const header = await res.text();
    document.querySelector('nav').innerHTML = header;
    setOptions();
}

async function setOptions() {
    const res = await fetch("../courses.json");
    const data = await res.json();

    const options = document.querySelector('.options');
    let content = "";

    data.forEach(course => {
        let name = course.name;
        // make the first character bigger
        name = name.charAt(0).toUpperCase() + name.slice(1);

        content += `<a href="${course.url ? course.url : `outer.html?lang=${course.name}`}" lang="${course.name}">${course.title ?course.title : name}</a>`
    })
    options.innerHTML = content;
}

function setHamburgerListeners() {
    document.getElementById('hamburger').addEventListener("click", event => {

        if (document.getElementById('hamburger').classList.contains('activebtn')) {
            document.getElementById('hamburger').classList.remove('activebtn');
            document.querySelector('aside').style.display = "none";
        }
        else {
            document.getElementById('hamburger').classList.add('activebtn');
            document.querySelector('aside').style.display = "block";
        }
    });
}