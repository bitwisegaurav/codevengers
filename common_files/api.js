const server = "http://127.0.0.1:8000/api/v1";

async function toggleCourse (courseId, isAdd) {
    const api = "/course/remove-course-from-user";

    if(isAdd) api = "/course/add-course-to-user";

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({courseId}),
        credentials: "include"
    }

    try {
        const data = await fetch(server + api, options)
        .then(res => res.json())
        .then(data => data.data);
        // console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}