const searchBox = document.querySelector('#searchBox');
const searchButton = document.querySelector('.searchBox button');

function search() {
    const searchTerm = searchBox.value.toLowerCase();
    const courseTitles = Array.from(document.querySelectorAll('.course .title'));
    
    courseTitles.forEach(title => {
        if (title.textContent.toLowerCase().includes(searchTerm)) {
            title.parentElement.parentElement.style.display = 'block';
        } else {
            title.parentElement.parentElement.style.display = 'none';
        }
    });
}

function setListeners() {
    searchButton.addEventListener('click', search);
    searchBox.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') search();
    });

    const buttons = document.querySelectorAll('.course button');

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const courseId = button.parentElement.getAttribute('_id');
            const api = button.classList.contains("remove") ? '/course/remove-course-from-user' : '/course/add-course-to-user';

            const data = await apiCall(api, "POST", { courseId });

            if (!data) {
                return;
            }

            if (button.textContent === '+') {
                button.innerHTML = '&minus;';
                button.classList.add('remove');
            } else {
                button.innerHTML = '+';
                button.classList.remove('remove');
            }
        });
    });
}

async function getCourses() {
    const api = "/course/get-all-courses";

    const data = await apiCall(api, "GET", null);

    if (!data) { return null; }

    return data;
}

async function getUserCourses () {
    const api = "/user/get-courses";

    const data = await apiCall(api, "GET", null);

    if (!data) { return null; }

    return data;
}

function setData(data, userCourses) {
    const courses = data;
    if(!courses || courses.length < 1) {
        setNoData("No Courses found");
        return;
    }

    const content = courses.map(course => {
        const isEnrolled = userCourses.find(userCourse => userCourse === course._id);

        return `
        <div class="course" _id="${course._id}">
            <a href="#">
                <div class="image">
                    <img src="${course.image}" alt="js image">
                </div>
                <div class="title">${course.title}</div>
            </a>
            ${isEnrolled ? `<button type="button" class="remove">&minus;</button>` : `<button type="button">+</button>`}
        </div>`;
    }).join('');

    document.querySelector('.innercontainer section .courses').innerHTML = content;
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
    const userCourses = await getUserCourses();

    if(!userCourses) {
        console.log("User is not logged in");
        return;
    }

    const courses = await getCourses(); 

    setData(courses, userCourses?.courses);
    setListeners();
})