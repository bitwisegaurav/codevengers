async function getHeader() {
    const response = await fetch('../components/header.html');
    const data = await response.text();

    const navbar = document.querySelector('nav');
    navbar.innerHTML = data;

    setOptions("", "../");
    setTheme();
    setListenersTheme();
}

function getUrlValues() {
    const url = new URL(window.location.href);
    const course = url.searchParams.get("course");
    const subject = url.searchParams.get("subject");
    const year = Number(url.searchParams.get("year"));

    return {course, subject, year};
}

function setValues (data) {
    const subject = document.querySelector('subject');
    const year = document.querySelector('year');

    subject.innerHTML = data.subject.toUpperCase() || "No Subject";
    year.innerHTML = data.year || "without year";

    const embedpdf = document.querySelector('.embed-pdf');
    embedpdf.setAttribute("src", `../question-papers/${data.course.toLowerCase()}/${data.year}/${data.subject.toLowerCase()}.pdf`);
}


window.addEventListener("DOMContentLoaded", async () => {
    getHeader();
    const data = getUrlValues();
    setValues(data);
})