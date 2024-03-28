const signupForm = document.querySelector('#signupForm');
const loginForm = document.querySelector('#loginForm');
const signupbtn = document.querySelector('#signupbtn');
const loginbtn = document.querySelector("#loginbtn");
const section = document.querySelector("#outerBox");
const signuperrorbox = document.querySelector('#signup-error');
const loginerrorbox = document.querySelector('#login-error');
const server = "http://127.0.0.1:8000";
const signupApi = "api/v1/user/create-account";
const loginApi = "api/v1/user/login";

signupbtn.addEventListener('click', () => {
    section.style.left = "0px";
    section.style.right = "";
});
loginbtn.addEventListener("click", function() {
    section.style.right = "0px";
    section.style.left = "";
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const form = new FormData(signupForm);
  const {username, name, email, password, profilepic, coverImage} = Object.fromEntries(form);

  // Validate form
  if(
    [username, name, email, password].some(field => !field || field === "")
  ) {
    signuperrorbox.innerHTML = "All fields are required";
    return;
  }

  if(!profilepic || !coverImage) {
    signuperrorbox.innerHTML = "Profile picture and cover image are required";
    return;
  }
  
//   console.log(form);

  // Send request to server
  fetch(`${server}/${signupApi}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
  .then(response => response.json())
  .then(data => {
    if(data.status === 'ok') {
        const username = data.user.username;
        localStorage.setItem('user', JSON.stringify({username}));
    } else {
        signuperrorbox.innerHTML = data.message;
    }
  });
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(loginForm);
    const {username, password} = Object.fromEntries(formData);

    // Send login request to server
    fetch(`http://127.0.0.1:8000/api/v1/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // username: "bitwisegaurav", 
            // password: "test"
            username,
            password
        }),
        credentials: "include"
    })
    .then((res) => {
        // console.log(res);
        if (res.ok) {
            return res.json(); // Parse response body as JSON
        }
    })
    .then(data => data.data)
    .then(data => data.data)
    .then(data => data.responseUser)
    .then(user => {
        const username = user.username;
        const accessToken = user.accessToken;
        const refreshToken = user.refreshToken;
        // // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(username));

        // set tokens in sessions
        Storage.set('accessToken', accessToken);
        Storage.set('refreshToken', refreshToken);
        console.log('Login successful:', user);
    })
    .catch((err) => {
        console.error('Login failed:', err);
        loginerrorbox.textContent = 'Error: ' + err.message;
    });

    // fetch(`http://localhost:8000/api/v1/user/get-user`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(res => {
    //     if(res.ok) {
    //         return res.json();
    //     }
    // })
    // .then(data => console.log(data))
    // .catch(err => {
    //     loginerrorbox.textContent = 'Error: ' + err.message;
    // })
});