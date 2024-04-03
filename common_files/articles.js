async function setHeader() {
    fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('nav').innerHTML = data;
        const languagesBox = document.querySelector('nav ul li .languages');
        if (languagesBox) {
            languagesBox.parentElement.removeChild(languagesBox);
        }
        setTheme();
        setListenersTheme();
    });
}

function setNoData(message = "No data found") {
    document.querySelector('.innercontainer section').innerHTML = `
    <div class="content">
        <div class="center">
            <p>${message}</p>
        </div>
    </div>`;
}

window.addEventListener("DOMContentLoaded", async () => {
    // setData()
    setHeader();
    // const userCourses = await getUserCourses();

    // if(!userCourses) {
    //     window.location.href = "../login.html";
    //     return;
    // }

    // const courses = await getCourses(); 

    // setData(courses, userCourses?.courses);
    // setListeners();
})