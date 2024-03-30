const maincontentBox = document.querySelector('.maincontent');
const server = "http://127.0.0.1:8000/api/v1";
const bottomBox = document.querySelector('.bottom');

function extractTextFromHtml(htmlString) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
}

async function getData(username) {
    let api = "/user/get-user";

    // get username from localstorage
    // if(!username) {
    //     username = JSON.parse(localStorage.getItem('user'));
    // }

    if(username && username.trim() !== "") api += "/" + username;

    // console.log(server + api);
    
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    }
    try {
        const data = await fetch(server + api, options)
        .then(res => res.json())
        .then(data => data.data)
        .then(data => data.user);
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

function setListeners(data) {
    const topBox = maincontentBox.querySelector('section > .top');
    const aTags = topBox.querySelectorAll('a');
    aTags.forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const activeBox = topBox.querySelector('.active');
            activeBox.classList.remove('active');
            a.classList.add('active');
            setContentBox(a.id, data);
        })
    })
}

function setContentBox(id, data) {
    switch(id) {
        case "courses":
            setCourses(data?.courses);
            break;
        case "articles":
            setArticles(data?.articles);
            break;
        case "solvedQuestions":
            setSolvedQuestion(data?.solvedQuestions);
            break;
        default:
            setNoData("No data found");
            break;
    }
}

function setData({user, username}){
    if(!user) return;

    document.querySelector('.coverImage img').src = user.coverImage;
    document.querySelector('.profile-pic img').src = user.avatar;
    document.querySelector('.profile-username p').innerHTML = user.username;

    const profileDetails = document.querySelector('.profile-details');

    profileDetails.querySelector('#name').innerHTML = user.name;
    profileDetails.querySelector('#articleCount').innerHTML = user.articles.length;
    profileDetails.querySelector('#followers').innerHTML = user.followers;
    profileDetails.querySelector('#following').innerHTML = user.following;

    if(!username || username.trim() === "" || user.username === username) {
        document.querySelector('.btns').style.display = "none";
    }
}

function setCourses(courses){
    if(!courses || courses.length < 1) {
        setNoData("No Courses added");
    }

    let content = '';

    courses.forEach(course => {
        content += `
        <div class="course" _id="${course._id}">
            <a href="#">
                <div class="icon">
                    <img src="${course.image}" alt="${course.title} icon">
                </div>
                <p class="title">${course.title}</p>
            </a>
            <button type="button">Remove</button>
        </div>`;
    })

    bottomBox.innerHTML = `<div class="courses">${content}</div>`;

    const buttons = document.querySelectorAll(".courses .course button")

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const parent = button.parentElement.getAttribute("_id");
            console.log(parent);
        })
    })
}

function setArticles(articles){
    if(!articles || articles.length < 1) {
        setNoData("No articles added");
    }

    let content = '';

    articles.forEach(article => {
        const para = extractTextFromHtml(article.body);
        content += `
        <div class="article" _id="${article._id}">
            <a href="#">
                <div class="image">
                    <img src="${article.imageURL}" alt="${article.title} image">
                </div>
                <div class="details">
                    <h3 class="title">${article.title}</h3>
                    <p class="description">${para}</p>
                </div>
            </a>
            <div class="btns">
                <button type="button">&Cross;</button>
            </div>
        </div>`;
    })

    bottomBox.innerHTML = `<div class="articles">${content}</div>`;

    const buttons = document.querySelectorAll(".articles .article .btns button")

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const parent = button.parentElement.parentElement.getAttribute("_id");
            console.log(parent);
        })
    })
}

function setSolvedQuestion(questions) {
    if(!questions || questions.length < 1) {
        setNoData("No Solved Questions found");
        return;
    }
}

function setNoData(message = "No data found") {
    bottomBox.innerHTML = `
    <div class="content">
        <div class="center">
            <p>${message}</p>
        </div>
    </div>`;
}

window.addEventListener("DOMContentLoaded", async () => {
    const url = new URL(window.location.href);
    const username = url.searchParams.get('username');

    const data = await getData(username);
    // const data = null;

    if(!data) {
        window.location.href = "./login.html";
    }

    setData({user: data, username});
    setListeners(data);
    setContentBox("courses", data)
})