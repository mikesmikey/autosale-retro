function printDiv(printDivName) {
    const currentPage = document.body.innerHTML

    document.body.innerHTML = document.getElementById(printDivName).innerHTML;

    window.print();

    document.body.innerHTML = currentPage;
}