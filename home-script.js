document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const createbtn = document.getElementById("createbtn");

    createbtn.addEventListener("click", function () {
        window.location.href = "newmem.html";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const pastbtn = document.getElementById("pastbtn");

    pastbtn.addEventListener("click", function () {
        window.location.href = "index.html";
    });
});