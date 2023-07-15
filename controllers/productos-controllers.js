// Manipulacion dom c/template html p/crear&exhibir lista prodcutos dinámicamente

const nuevoProducto = (name,imageUrl,price, id) => { // creo Var q recibe atributos del producto(nombre,precio,etc)
   let card = document.createElement("div") // creo otra var llamada card q representa c/prodcuto
   let contenido =  `<div class="producto"> 
   <img class="${imageUrl}" src="" alt="">
   <h1 class="title_productos">${name}</h1>
   <span class="precio_productos">${price}</span>
   <a class="link_detalles_productos" href="../producto.html?id=${id}" >Ver producto</a>
</div> ` 
   // y creo var q contendrá la info de c/producto
    // Ahora poner el contenido dentro de card 
    card.innerHTML = contenido
    card.dataset.id = id 
   
    return card
}
 // Traer referencia data-product
const productos = document.querySelector("[data-product]")
