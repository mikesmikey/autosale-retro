function switchMenuDropDown(source) {
    if (source.classList.contains('is-active')) {
        source.classList.remove('is-active');
    } else {
        source.classList.add('is-active');
    }
}

function mainMenuCheck(e) {
    const target = e.target;

    console.log(target)

    if (target.id === "car-manage-button"
        && !window.location.href.includes("car_buy.html")
        && !window.location.href.includes("car_sell.html")) {
            switchMenuDropDown(document.getElementById('car-manage-list'));
    // } else if (target.id === "fix-manage-button"
    // && !window.location.href.includes("car_fix.html")
    // && !window.location.href.includes("car_fix_part.html")) {
    //     switchMenuDropDown(document.getElementById('fix-manage-list'));
    } else if (target.id === "part-manage-button"
    && !window.location.href.includes("part_company.html")
    && !window.location.href.includes("part_order.html")) {
        switchMenuDropDown(document.getElementById('part-manage-list'));
    }
}