var authStatus = true;

function checkAuth() {
    if (!authStatus) {
        window.location.replace('./login.html');
    }
}

function mockLogin() {
    authStatus = true;
    window.location.href = './index.html';
}

function mockRegister() {
    window.location.replace('./login.html');
}

function mockLogout() {
    authStatus = false;
    window.location.href = './login.html';
}