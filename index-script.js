document.getElementById("saveMemory").addEventListener("click", function() {
    let mood = document.getElementById("memoryMood").value;
    
    if (mood === "happy") {
        window.location.href = "happy.html"; // Happy mood page
    } else if (mood === "sad") {
        window.location.href = "sad.html"; // Sad mood page
    } else if (mood === "romantic") {
        window.location.href = "romantic.html"; // Romantic mood page
    } else {
        alert("Please select a mood before proceeding!");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
        window.location.href = "login.html"; // Login page pe wapas bhejega
    });
});