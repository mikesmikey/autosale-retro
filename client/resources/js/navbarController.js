function switchNavBarDropDown() {
    var dropdown = document.getElementById('navbar-dropdown');
    if (dropdown.classList.contains('is-active')) {
        dropdown.classList.remove('is-active');
    } else {
        dropdown.classList.add('is-active');
    }
}