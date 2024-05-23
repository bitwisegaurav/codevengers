const coursesBox = document.querySelector("#courses");
const subjectsBox = document.querySelector("#subjects");
const yearsBox = document.querySelector("#years");
const scrollcontainer = document.querySelector(".scrollcontainer");
const topDiv = document.querySelector(".top");
const backBtn = topDiv.querySelector(".backbtn");
const nextBtn = topDiv.querySelector(".nextbtn");
const selectiondiv = topDiv.querySelector("selection");
let course = null,
    subject = null,
    year = 0,
    scrollCount = 1,
    noOfOptions = 3;

async function getData() {
    const responses = await fetch("json/qpcourse.json");
    const data = await responses.json();

    if (!data) return {};

    return data;
}

async function getHeader() {
    const response = await fetch('../components/header.html');
    const data = await response.text();

    const navbar = document.querySelector('nav');
    navbar.innerHTML = data;

    setOptions("", "../");

    const prePath = "../";

    const homelinks = document.getElementsByClassName('homelinks');
    for (let i = 0; i < homelinks.length; i++) {
        homelinks[i].href = prePath + "index.html";
    }

    setTheme();
    setListenersTheme();
}

function setScroll() {
    scrollcontainer.style.left = `-${(scrollCount - 1) * 100}%`;

    let text = ["Course", "Subject", "Year"];

    selectiondiv.innerHTML = text[scrollCount - 1];

    const element = document.querySelector(
        `#${text[scrollCount]?.toLowerCase()}s`
    );

    if (scrollCount === 1) {
        backBtn.setAttribute("disabled", true);
    } else {
        backBtn.removeAttribute("disabled");
    }

    if (
        scrollCount === noOfOptions ||
        !element ||
        (element && element.childElementCount < 1)
    ) {
        nextBtn.setAttribute("disabled", true);
    } else {
        nextBtn.removeAttribute("disabled");
    }
}

function setCourseData(data) {
    const keys = Object.keys(data);
    const content = keys
        .map((course) => {
            return `<button type="button" class="course">${course.toUpperCase()}</button>`;
        })
        .join("");

    coursesBox.innerHTML = content;
}

function setSubjectData(data) {
    const subjects = Object.keys(data.subjects);
    // console.log(subjects);
    const content = subjects
        .map((subject) => {
            return `<button type="button" class="subjectbtn">${subject.toUpperCase()}</button>`;
        })
        .join("");

    subjectsBox.innerHTML = content;
    setSubjectListeners(data.subjects);
}

function setYearData(years) {
    const content = years
        .map((year) => {
            return `<button type="button" class="yearbtn">${year}</button>`;
        })
        .join("");

    yearsBox.innerHTML = content;
    setYearsListeners();
}

function setCourseListeners(data) {
    const courseBtns = document.querySelectorAll(".course");
    courseBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            course = e.target.textContent.toLowerCase();
            setSubjectData(data[course]);
            scrollCount = 2;
            setScroll();
        });
    });
}

function setSubjectListeners(data) {
    const subjectBtns = document.querySelectorAll(".subjectbtn");
    subjectBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            subject = e.target.textContent.toLowerCase();
            setYearData(data[subject]);
            scrollCount = 3;
            setScroll();
        });
    });
}

function setYearsListeners() {
    const yearBtns = document.querySelectorAll(".yearbtn");
    yearBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            year = Number(e.target.textContent);
            window.open(
                `qpaper.html?course=${course}&subject=${subject}&year=${year}`,
                "_blank"
            );
        });
    });
}

function setListeners() {
    backBtn.addEventListener("click", () => {
        scrollCount--;
        setScroll();
    });

    nextBtn.addEventListener("click", () => {
        scrollCount++;
        setScroll();
    });
}

window.addEventListener("DOMContentLoaded", async () => {
    getHeader();
    const data = await getData();
    // console.log(data);
    setCourseData(data);
    setCourseListeners(data);
    setListeners();
    setScroll();
});
