async function getHeader() {
    const res = await fetch("../components/header.html");
    const header = await res.text();
    document.querySelector('nav').innerHTML = header;
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