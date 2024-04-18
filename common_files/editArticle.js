const form = document.querySelector("form");
const errorBox = document.getElementById("error");

function getId() {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    return id || null;
}

function setListeners(id) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const {title, content} = Object.fromEntries(formData.entries());

        if(!title.trim() && !content.trim()) {
            errorBox.innerHTML = "Please provide atleast one field";
            return;
        }

        const api = `/article/update-article/${id}`;

        try {
            const response = await apiCall(api, "PUT", {title, body: content});
    
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
   
    // if(!id) {
    //     window.location.href = "./login.html";
    // }

    setListeners(id);
})