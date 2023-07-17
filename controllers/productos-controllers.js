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
    data.forEach(producto => {
      const { name, imageUrl, price, id } = producto;
      const card = nuevoProducto(name, imageUrl, price, id);
      productos.appendChild(card);
    });
  })
  .catch(error => console.log(error));