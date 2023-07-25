const dropArea = document.querySelector(".drag-area");
const dropText = document.querySelector(".text_drag_area");
const button = dropArea.querySelector("label[for='input-file']");
const input = document.getElementById("input-file");
let files;

button.addEventListener("click", (e) => {
    e.preventDefault();
    input.click();
}); 

function handleFiles(files) {
    dropArea.classList.add("active");
    const preview = document.getElementById("preview");
    preview.innerHTML = "";

    if (files.length === undefined) {
        ProcessFile(files);
    } else {
        for (const file of files) {
            ProcessFile(file);
        }
    }
    dropArea.classList.remove("active");
}

input.addEventListener("change", (e) => {
    const files = e.target.files;
    handleFiles(files);
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dropText.textContent = "Suelta para subir tu archivo";
    dropText.style.border = "2px dashed darkgrey";
    dropText.style.background = "lightgrey"
});

dropArea.addEventListener("dragleave", (e) => {
    dropArea.classList.remove("active");
    dropText.textContent = "Arrastre para agregar una imagen para el producto";
    dropText.style.border = "3px dashed #ddd";
    dropText.style.background = "";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dropText.textContent = "Arrastre para agregar una imagen para el producto";
    dropText.style.background = "transparent"
    const files = e.dataTransfer.files;
    handleFiles(files);
});

function ProcessFile(file) {
    const preview = document.getElementById("preview");
    const fileContainer = document.createElement("div");
    fileContainer.classList.add("file_container");
    const fileName = document.createElement("span");
    fileName.textContent = file.name;
    const fileSize = document.createElement("span");
    fileContainer.appendChild(fileName);
    fileContainer.appendChild(fileSize);
    preview.appendChild(fileContainer);
}

/* Btn_añadirProducto */