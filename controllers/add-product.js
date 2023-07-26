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

    const image = document.createElement("img");
    image.classList.add("preview-image");
    fileContainer.appendChild(image);
    image.style.width = "130"
    image.style.height = "100"
  
    const fileName = document.createElement("span");
    fileName.textContent = file.name;
    const fileSize = document.createElement("span");
    fileSize.textContent = (file.size / (375 * 375)).toFixed(2) + " MB";
    fileContainer.appendChild(fileName);
    fileContainer.appendChild(fileSize);
    preview.appendChild(fileContainer);

    const reader = new FileReader();
    reader.onload = (event) => {
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

/* Validacion add product */

const imgProduct = document.getElementById("file-img");
const imgInput = document.getElementById("input-file");
const nombreInput = document.getElementById('nombreInput');
const precioInput = document.getElementById('precioInput');
const descripcionInput = document.getElementById('descripcionInput');
const formBtn = document.getElementById('add_new_product');

const imageError = document.getElementById("imagenNproduct");
const nombreError = document.getElementById('nameErrorNproduct');
const precioError = document.getElementById('priceErrorNproduct');
const descripcionError = document.getElementById('descripcionErrorNproduct');

imgInput.addEventListener('change', () => {
    validateimgProduct();
  });

imgProduct.addEventListener('input', () => {
    validateimgProduct();
})
nombreInput.addEventListener('input', () => {
  validateNombreInput();
});
precioInput.addEventListener('input', () => {
  validatePrecioInput();
});
descripcionInput.addEventListener('input', () => {
  validateDescripcionInput();
});

formBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (isFormValid()) {
    console.log('El formulario está completo y válido. Se puede agregar el producto.');
  }
});

function validateimgProduct() {
    const files = imgInput.files;
    if (!files || files.length === 0) {
      showError(imageError, 'Debe agregar una imagen para el producto.');
    } else {
      hideError(imageError);
    }
}
const btnFile = document.querySelector('.btn_file');
btnFile.addEventListener('click', () => {
  hideError(imageError);
});
imgProduct.addEventListener('dragover', (e) => {
  e.preventDefault();
  hideError(imageError);
});

imgProduct.addEventListener('drop', (e) => {
  e.preventDefault();
  validateimgProduct();
});

function validateNombreInput() {
  const nombre = nombreInput.value.trim();
  if (!nombre) {
    showError(nameErrorNproduct, 'El campo de nombre es requerido.');
  } else if (nombre.length > 40) {
    showError(nameErrorNproduct, 'El campo de nombre debe tener máximo 40 caracteres.');
  } else {
    hideError(nameErrorNproduct);
  }
}
function validatePrecioInput() {
  const precio = precioInput.value.trim();
  if (!precio) {
    showError(priceErrorNproduct, 'El campo de precio es requerido.');
  } else {
    hideError(priceErrorNproduct);
  }
}
function validateDescripcionInput() {
  const descripcion = descripcionInput.value.trim();
  if (!descripcion) {
    showError(descripcionErrorNproduct, 'El campo de descripción es requerido.');
  } else if (descripcion.length > 150) {
    showError(descripcionErrorNproduct, 'El campo de descripción debe tener máximo 150 caracteres.');
  } else {
    hideError(descripcionErrorNproduct);
  }
}
function isFormValid() {
  let isValid = true;
  validateimgProduct();
  validateNombreInput();
  validatePrecioInput();
  validateDescripcionInput();

  if (imagenNproduct.textContent || nameErrorNproduct.textContent || priceErrorNproduct.textContent || descripcionErrorNproduct.textContent) {
    isValid = false;
  }
  return isValid;
}
function showError(element, text) {
  element.textContent = text;
}
function hideError(element) {
  element.textContent = '';
  element.style.display = 'none';
} 

/* Input $ */

  precioInput.addEventListener('keydown', (event) => {
    const { key, target } = event;
    const currentPosition = target.selectionStart;
    const value = target.value;
    const valueWithoutChar = value.slice(0, currentPosition) + value.slice(currentPosition + 1);

    if (key.match(/[0-9.]/)) {
      const updatedValue = valueWithoutChar.slice(0, currentPosition) + key + valueWithoutChar.slice(currentPosition);
      const formattedValue = formatPrecio(updatedValue);
      target.value = formattedValue;
      target.setSelectionRange(currentPosition + 1, currentPosition + 1);
      event.preventDefault();
    } else if (key === 'Backspace') {
      const updatedValue = valueWithoutChar.slice(0, currentPosition - 1) + valueWithoutChar.slice(currentPosition);
      const formattedValue = formatPrecio(updatedValue);
      target.value = formattedValue;
      target.setSelectionRange(currentPosition - 1, currentPosition - 1);
      event.preventDefault();
    }
});

function formatPrecio(value) {
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const formattedValue = `$${cleanedValue}`;
    return formattedValue;
}