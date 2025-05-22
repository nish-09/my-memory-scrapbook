document.getElementById("changeMoodBtn").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
        window.location.href = "login.html"; // Login page pe wapas bhejega
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    
    // Romantic mood ki images fetch karne ke liye
    let romanticMemories = JSON.parse(localStorage.getItem("Romantic")) || [];

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5); // Randomize images
    }

    function displayMemories() {
        gallery.innerHTML = "";
        let shuffledMemories = shuffleArray(romanticMemories); // Shuffle memory order
        
        shuffledMemories.forEach((memory, memoryIndex) => {
            memory.images.forEach((image, imageIndex) => {
                const card = document.createElement("div");
                card.classList.add("image-card");

                const img = document.createElement("img");
                img.src = image.src;
                img.alt = "Romantic Memory";

                const info = document.createElement("div");
                info.classList.add("image-info");
                info.innerHTML = `<p>${memory.text}</p><small>${memory.date}</small>`;

                // Create delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete-btn");
                deleteBtn.textContent = "Delete";

                deleteBtn.addEventListener("click", function(e) {
                    e.stopPropagation(); // Prevent other click events

                    // Remove the image from romanticMemories
                    romanticMemories[memoryIndex].images.splice(imageIndex, 1);

                    // If no images left in this memory, remove the whole memory
                    if (romanticMemories[memoryIndex].images.length === 0) {
                        romanticMemories.splice(memoryIndex, 1);
                    }

                    // Update localStorage
                    localStorage.setItem("Romantic", JSON.stringify(romanticMemories));

                    // Refresh gallery
                    displayMemories();
                });

                card.appendChild(img);
                card.appendChild(info);
                card.appendChild(deleteBtn);
                gallery.appendChild(card);
            });
        });
    }

    displayMemories();
});
