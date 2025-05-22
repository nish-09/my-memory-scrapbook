// When "Change Mood" button is clicked, go back to mood selection
document.getElementById("changeMoodBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});

// When "Logout" button is clicked, redirect to login page
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
});

// Load and display Sad Memories
document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");

    // Get sad memories from localStorage
    let sadMemories = JSON.parse(localStorage.getItem("Sad")) || [];

    // Shuffle the memory array
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Display each memory in the gallery
    function displayMemories() {
        gallery.innerHTML = "";
        let shuffledMemories = shuffleArray(sadMemories);

        shuffledMemories.forEach((memory, memoryIndex) => {
            memory.images.forEach((image, imageIndex) => {
                const card = document.createElement("div");
                card.classList.add("image-card");

                const img = document.createElement("img");
                img.src = image.src;
                img.alt = "Sad Memory";

                const info = document.createElement("div");
                info.classList.add("image-info");
                info.innerHTML = `<p>${memory.text}</p><small>${memory.date}</small>`;

                // Create delete button
                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete-btn");
                deleteBtn.textContent = "Delete";

                // Delete functionality
                deleteBtn.addEventListener("click", function (e) {
                    e.stopPropagation(); // Prevent other click events

                    // Remove the image from sadMemories
                    sadMemories[memoryIndex].images.splice(imageIndex, 1);

                    // If no images left in this memory, remove the whole memory
                    if (sadMemories[memoryIndex].images.length === 0) {
                        sadMemories.splice(memoryIndex, 1);
                    }

                    // Update localStorage
                    localStorage.setItem("Sad", JSON.stringify(sadMemories));

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
