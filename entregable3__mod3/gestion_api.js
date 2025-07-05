const url = 'http://localhost:3000/libros';

async function obtenerLibros() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        mostrarLibros(data);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

async function agregarLibro(libro) {
    if (!validarLibro(libro)) return;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        });
        const data = await response.json();
        console.log("Libro agregado:", data);
        obtenerLibros();
    } catch (error) {
        console.error("Error al agregar el libro:", error);
    }
}

async function actualizarLibro(id, libro) {
    if (!validarLibro(libro)) return;

    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        });
        const data = await response.json();
        console.log("Libro actualizado:", data);
        obtenerLibros();
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
    }
}

async function eliminarLibro(id) {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        console.log("Libro eliminado");
        obtenerLibros();
    } catch (error) {
        console.error("Error al eliminar el libro:", error);
    }
}

function validarLibro(libro) {
    if (!libro.title || typeof libro.title !== "string") {
        console.error("Título inválido.");
        return false;
    }

    if (!libro.author || typeof libro.author !== "string") {
        console.error("Autor inválido.");
        return false;
    }

    if ("yearPublication" in libro && typeof libro.yearPublication !== "number") {
        console.error("Año de publicación inválido.");
        return false;
    }

    return true;
}


document.addEventListener("DOMContentLoaded", () => {
    obtenerLibros();

    const form = document.getElementById("libro-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const idValue = document.getElementById("libro-id").value;
        const id = parseInt(idValue);

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const year = parseInt(document.getElementById("yearPublication").value);

        const libro = { title, author, yearPublication: year };

        if (!validarLibro(libro)) return;

        if (!isNaN(id)) {
            actualizarLibro(id, libro);
        } else {
            agregarLibro(libro);
        }

        form.reset();
        document.getElementById("libro-id").value = '';
    });
});

function mostrarLibros(libros) {
    const contenedor = document.getElementById("libros");
    contenedor.innerHTML = "";
    libros.forEach(libro => {
        const div = document.createElement("div");
        div.className = "libro";
        div.innerHTML = `
            <h3>${libro.title}</h3>
            <p><strong>Autor:</strong> ${libro.author}</p>
            <p><strong>Año:</strong> ${libro.yearPublication}</p>
            <button onclick="cargarLibro(${libro.id})">Editar</button>
            <button onclick="eliminarLibro(${libro.id})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

async function cargarLibro(id) {
    try {
        const response = await fetch(`${url}/${id}`);
        const libro = await response.json();

        document.getElementById("libro-id").value = libro.id;
        document.getElementById("title").value = libro.title;
        document.getElementById("author").value = libro.author;
        document.getElementById("yearPublication").value = libro.yearPublication;

        document.getElementById("libro-form-section").scrollIntoView({ behavior: "smooth" });

    } catch (error) {
        console.error("Error al cargar el libro:", error);
    }
}
