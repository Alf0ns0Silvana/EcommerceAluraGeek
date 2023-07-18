// GET 

const listaProductos = () => { // crea var funcion para traer
   return fetch("http://localhost:3000/producto") // la informacion mediante fetch y
    .then(respuesta => respuesta.json()) // cuando recibamos la respuesta (con .then) la transformamos a json.
    .catch(error => console.log(error)) // crear error en caso de que respuesta sea error
}

// Exportar a new carpeta "controller", creo variable c/name de esta carpeta y llamo a variable que trae informacion con fetch (info db.json)
export const productosServicios = {
    listaProductos
}

