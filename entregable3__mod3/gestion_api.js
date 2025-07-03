
const url = 'http://localhost:3000/libros';

fetch(url)
  .then(response => response.json())
  .then(data => console.log("Productos disponibles:", data))
  .catch(error => console.error("Error al obtener los productos:", error));

const nuevoLibro = {id: 4, title: "Juan Salvador Gaviota", author: "Richard Bach", yearPublication: 1970};

fetch(url, {
  method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(nuevoLibro)
})
    .then(response => response.json())  
    .then(data => console.log("Libro agregado:", data))
    .catch(error => console.error("Error al agregar el libro:", error));

const libroActualizado = {title: "Cien años de soledad", author: "Karina Henao"};

fetch(`${url}/1`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(libroActualizado)
})
    .then(response => response.json())
    .then(data => console.log("Libro actualizado:", data))
    .catch(error => console.error("Error al actualizar el libro:", error));


fetch(`${url}/3`, {
    method: 'DELETE'
})
    .then(() => console.log("Libro eliminado"))
    .catch(error => console.error("Error al eliminar el libro:", error));
    