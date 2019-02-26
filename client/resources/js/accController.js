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

function refreshPage() {
    window.location.reload();
}

<<<<<<< HEAD
=======
function plate_license_add() {
    window.location.href = './plate_license_add.html';
}

function mockCarFixAdd() {
    window.location.href = './car_fix_add.html';
}

function usedPartUpdate() {
    window.location.href = './used_part_update.html';
}




//initial method
checkAuth();
>>>>>>> a412a086b6c02161e2778e214d4d057d9155464f
