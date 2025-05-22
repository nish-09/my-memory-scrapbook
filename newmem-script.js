document.addEventListener("DOMContentLoaded", function () {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const previewContainer = document.getElementById("preview");
    const saveMemoryBtn = document.getElementById("save-memory");
    let selectedImages = [];

    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, (e) => e.preventDefault());
    });

    // Highlight drop area when dragging files
    ["dragenter", "dragover"].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add("highlight"));
    });

    ["dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove("highlight"));
    });

    // Handle dropped files
    dropArea.addEventListener("drop", (e) => {
        handleFiles(e.dataTransfer.files);
    });

    // Handle selected files
    fileInput.addEventListener("change", () => {
        handleFiles(fileInput.files);
    });

    function handleFiles(files) {
        for (let file of files) {
            if (file.type.startsWith("image/")) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    addImageToPreview(e.target.result, file.name);
                };
                reader.readAsDataURL(file);
            }
        }
    }

    function addImageToPreview(imageSrc, fileName) {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        const img = document.createElement("img");
        img.src = imageSrc;
        img.alt = fileName;
        img.classList.add("preview-img");

        const removeBtn = document.createElement("span");
        removeBtn.innerHTML = "&times;";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = function () {
            imgContainer.remove();
            selectedImages = selectedImages.filter(img => img.name !== fileName);
        };

        imgContainer.appendChild(img);
        imgContainer.appendChild(removeBtn);
        previewContainer.appendChild(imgContainer);
        selectedImages.push({ name: fileName, src: imageSrc });
    }

    // Save Memory
    saveMemoryBtn.addEventListener("click", function () {
        const memoryDate = document.getElementById("memory-date").value;
        const memoryText = document.getElementById("memory-text").value;
        const memoryType = document.getElementById("memory-type").value;

        if (!memoryDate || !memoryText || selectedImages.length === 0 || !memoryType) {
            alert("Please fill all fields and add at least one image.");
            return;
        }

        const memoryData = {
            date: memoryDate,
            text: memoryText,
            type: memoryType,
            images: selectedImages
        };

        let storedMemories = JSON.parse(localStorage.getItem(memoryType)) || [];
        storedMemories.push(memoryData);
        localStorage.setItem(memoryType, JSON.stringify(storedMemories));

        alert("Memory saved successfully!");
        document.getElementById("memory-text").value = "";
        document.getElementById("memory-date").value = "";
        document.getElementById("memory-type").value = "";
        previewContainer.innerHTML = "";
        selectedImages = [];
        
        // Redirect to home.html after saving
        window.location.href = "home.html";
    });
});