const nodataBox = document.getElementById('nodata');
const containerBox = document.querySelector('.container');
const title = containerBox.querySelector('.upper .title');
const middleBox = containerBox.querySelector('.middle');
const bottomBox = containerBox.querySelector('#bottom');

function setDataBox(data) {
    const content = data.map(item => {
        return `<div class="dataBox">
            <div class="data">${item.data}</div>
            <div class="label">${item.label}</div>
        </div>`
    }).join('');

    return content;
}

// async get header values
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

// database calls for getting data
async function getUsers() {
    const data = {
        userCount: 10,
        users: [
            {
                image: "http://res.cloudinary.com/dujd69tub/image/upload/v1709444868/sf25kufqpcrur6ccxgqn.jpg",
                name: "Gaurav Mishra",
                username: "bitwisegaurav",
            }
        ]
    };

    return data;
}

async function getCourses() {
    const data = {
        courseCount: 10,
        courses: [
            {
                image: "http://res.cloudinary.com/dujd69tub/image/upload/v1710719793/wlzoofbw5e8wl1mbdrjt.png",
                title: "JavaScript",
                modulesCount: "12",
            },
        ]
    };

    return data;
}

async function getArticles() {
    const data = {
        articles: [
            {
                image: "http://res.cloudinary.com/dujd69tub/image/upload/v1710719793/wlzoofbw5e8wl1mbdrjt.png",
                title: "Installing Linux on an iMac",
                description: "Many people may like the look and feel of Linux over other Desktop Operating Systems (OS). For this reason someone may want to install Linux on a Mac.",
                user: {
                    image: "http://res.cloudinary.com/dujd69tub/image/upload/v1709444868/sf25kufqpcrur6ccxgqn.jpg",
                    name: "Gaurav Mishra",
                    username: "bitwisegaurav",
                }
            },
        ]
    };

    return data;
}

// setting data in the document
async function setUsersData() {
    title.textContent = 'User Data';

    const data = await getUsers();

    const userCount = data.userCount || 0;

    middleBox.innerHTML = setDataBox([{ data: userCount, label: 'Total Users' }]);

    const users = data.users;

    const content = users.map(user => {
        return `<a href="profile.html?username=${user.username}" class="user">
        <div class="image">
            <img src="${user.image}" alt="${user.username} image">
        </div>
        <div class="details">
            <p class="username">${user.username}</p>
            <p class="name">${user.name}</p>
        </div>
    </a>`
    }).join('');

    bottomBox.innerHTML = content;

    // remove other classes from bottomBox
    bottomBox.className = '';
    bottomBox.classList.add('users');
}

async function setCoursesData() {
    title.textContent = 'Course Data';

    const data = await getCourses();

    middleBox.innerHTML = setDataBox([
        {
            data: data.courseCount || 0, 
            label: 'Total Courses'
        },
        {
            data: data.modulesCount || 0, 
            label: 'Total Modules'
        },
        {
            data: data.assignments || 0, 
            label: 'Total Assignments'
        },
    ]);

    const courses = data.courses;

    const content = courses.map(course => {
        return `<div class="course">
        <a href="#">
            <div class="icon">
                <img src="${course.image}" alt="${course.title} icon">
            </div>
            <p class="title">${course.title}</p>
            <p class="modules">No. of chapters ${course.modulesCount}</p>
        </a>
        <div class="btns">
            <button type="button" class="editbtn">Edit</button>
            <button type="button" class="removebtn">Remove</button>
        </div>
    </div>`
    }).join('');

    bottomBox.innerHTML = content;

    // remove other classes from bottomBox
    bottomBox.className = '';
    bottomBox.classList.add('courses');
}

async function setArticlesData() {
    title.textContent = 'Article Data';

    const data = await getArticles();

    middleBox.innerHTML = setDataBox([
        {
            data: data.articlesCount || 0, 
            label: 'Total Articles'
        },
    ]);

    const artilces = data.articles;

    const content = artilces.map(article => {
        return `<div class="article">
            <a href="#">
                <div class="image">
                    <img src="${article.image}" alt="${article.title} image">
                </div>
                <div class="details">
                    <h3 class="title">${article.title}</h3>
                    <p class="description">${article.description}</p>
                    <div class="user">
                        <div class="image">
                            <img src="${article.user.image}" alt="${article.user.username} avatar">
                        </div>
                        <p class="username">${article.user.username}</p>
                    </div>
                </div>
            </a>
            <div class="btns">
                <button type="button">&Cross;</button>
            </div>
        </div>`
    }).join('');

    bottomBox.innerHTML = content;

    // remove other classes from bottomBox
    bottomBox.className = '';
    bottomBox.classList.add('articles');
}

function setListeners() {
    const links = document.querySelectorAll('aside ul li a');

    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            document.querySelector('.active').classList.remove('active');
            link.classList.add('active');

            if (link.classList.contains('notAvailable')) {
                nodataBox.style.display = 'flex';
                containerBox.style.display = 'none';
            }
            else {
                nodataBox.style.display = 'none';
                containerBox.style.display = 'flex';

                if (link.id.toLowerCase() === "users") {
                    setUsersData()
                } else if (link.id.toLowerCase() === "courses") {
                    setCoursesData()
                } else if (link.id.toLowerCase() === "articles") {
                    setArticlesData()
                }
            }
        })
    })

}

window.addEventListener("DOMContentLoaded", async () => {
    setHeader();
    setListeners()
    setUsersData()
})