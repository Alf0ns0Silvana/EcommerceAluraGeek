// Manipulacion dom c/template html p/crear&exhibir lista prodcutos dinámicamente
import { productosServicios } from '../servicios/productos-servicios.js';


const nuevoProducto = (name,imageUrl,price, id) => { // creo Var q recibe atributos del producto(nombre,precio,etc)
   let card = document.createElement("div") // creo otra var llamada card q representa c/prodcuto
   let contenido =  `<div class="producto"> 
   <img class="img_producto" src="${imageUrl}" alt="Foto del producto">
   <h3 class="title_producto">${name}</h3>
   <span class="precio_producto">$${price}</span>
   <a class="link_detalles_producto" href="./index.html?id=${id}" >Ver producto</a>
</div> ` 
   // y creo var q contendrá la info de c/producto
    // Ahora poner el contenido dentro de card 
    card.innerHTML = contenido
    card.dataset.id = id 
    return card
}
 // Traer referencia data-product
const productos = document.querySelector("[data-product]")

// Crear funcion para mostrar elementos en pantalla 

productosServicios.listaProductos()
  .then(data => {
    const sections = document.querySelectorAll('.section_product');
    const productosPorSeccion = Math.ceil(data.length / sections.length);
    sections.forEach((section, index) => {
      const productosSeccion = data.slice(index*productosPorSeccion,(index+1)*productosPorSeccion);
      productosSeccion.forEach(producto => {
        const { name, imageUrl, price, id } = producto;
        const card = nuevoProducto(name, imageUrl, price, id);
        section.appendChild(card);
      });
    });
  })
  .catch(error => console.log(error));

/* consolas */
const verConsolasBtn = document.getElementById("verConsolasBtn");
const starWarsSection = document.getElementById("star_wars");
const diversosSection = document.getElementById("diversos");
const consolasSection = document.getElementById("consolas");

verConsolasBtn.addEventListener("click", () => {
  starWarsSection.style.display = "none";
  diversosSection.style.display = "none";
  consolasSection.style.display = "block";
});

/* Validacion form_consultas */

const formConsultas = document.querySelector('.form_consultas');
const inputNombre = formConsultas.querySelector('input[type="text"]');
const textareaMensaje = formConsultas.querySelector('textarea');
const formBtn = formConsultas.querySelector('.form_btn');

const nombreError = createErrorMessage('Este es requerido y debe tener máximo 40 caracteres.');
const mensajeError = createErrorMessage('Este campo es requerido y debe tener máximo 120 caracteres.');
const successMessage = document.querySelector('.success-message');

inputNombre.after(nombreError);
textareaMensaje.after(mensajeError);

formBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const nombre = inputNombre.value.trim();
  const mensaje = textareaMensaje.value.trim();
  let isValid = true;

  isValid = validateField(nombre, nombreError, [
    { condition: !nombre, message: 'El campo de nombre es requerido y debe tener máx 40 caracteres.'},
    { condition: nombre.length > 40}
  ]);

  isValid = validateField(mensaje, mensajeError, [
    { condition: !mensaje, message: 'El campo de mensaje es requerido y debe tener máx 120 caracteres.' },
    { condition: mensaje.length > 120 }
  ]) && isValid;

  if (isValid) {
    showSuccess(successMessage);
    console.log('Mensaje enviado:', nombre, mensaje);
    formConsultas.reset();
  }
});

function createErrorMessage(text) {
  const errorMessage = document.createElement('span');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = text;
  errorMessage.style.display = 'none';
  return errorMessage;
}
function createSuccessMessage(text) {
  const successMessage = document.createElement('span');
  successMessage.classList.add('success-message');
  successMessage.textContent = text;
  successMessage.style.display = 'none';
  return successMessage;
}
function validateField(value, errorElement, validations) {
  let isValid = true;
  errorElement.style.display = 'none';

  validations.forEach(({ condition, message }) => {
    if (condition) {
      showError(errorElement, message);
      isValid = false;
    }
  });
  return isValid;
}
function showError(element, text) {
  element.textContent = text || element.textContent;
  element.style.display = 'block';
}
function showSuccess(element) {
  element.style.display = 'block';
  setTimeout(() => {
    element.style.display = 'none';
  }, 10000);
}