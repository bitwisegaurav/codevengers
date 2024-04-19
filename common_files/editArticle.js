const form = document.querySelector("form");
const errorBox = document.getElementById("error");
let articleDetail = {};

async function getArticle(id) {
    const api = `/article/get-articleById/${id}`;
    const article = await apiCall(api);

    // const article = {
    //     title: "Title",
    //     body: "<h1>Body</h1>"
    // }

    if(article) {
        articleDetail = article;
    }

    return article;
}

function getId() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    return id || null;
}

function setData() {
    form.querySelector("#title").value = articleDetail.title;
    form.querySelector("#body").value = articleDetail.body;
    form.querySelector("#textEditorbtn").href = `./textEditor.html?content=${articleDetail.body}`;
}

function setListeners(id) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const {title, body} = Object.fromEntries(formData.entries());

        if(!title.trim() && !body.trim()) {
            errorBox.innerHTML = "Please provide atleast one field";
            return;
        }

        if(title === articleDetail.title && body === articleDetail.body) {
            errorBox.innerHTML = "No changes made";
            return;
        }

        errorBox.innerHTML = "";

        const data = {
            ...(title !== articleDetail.title && {title}),
            ...(body !== articleDetail.body && {body})
        }

        // console.log(data);

        const api = `/article/update-article/${id}`;

        try {
            const response = await apiCall(api, "PATCH", data);
    
            if (response) {
                window.location.href = "./articles.html";
            }
        } catch (error) {
            errorBox.innerHTML = error;
        }
    });
}

window.addEventListener("DOMContentLoaded", async () => {
    setHeader();
    const id = getId();

    if(!id) window.location.href = "./articles.html"

    const article = await getArticle(id);

    if(!article) window.location.href = "./login.html"

    if(article) setData();
   
    // if(!id) {
    //     window.location.href = "./login.html";
    // }

    setListeners(id);
})