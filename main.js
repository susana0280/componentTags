// Inicializa un array vacío llamado tags para almacenar las etiquetas.
let tags = [];

// Selecciona el contenedor de entrada de etiquetas por su ID.
const inputTagContainer = document.querySelector("#input-tag");
// Crea un nuevo div para contener las etiquetas.
const tagsContainer = document.createElement("div");
// Crea un nuevo span que servirá como entrada de texto editable para las etiquetas.
const inputTag = document.createElement("span");

// Configura el elemento inputTag como un textbox accesible y editable.
inputTag.ariaRoleDescription = "textbox"; // Establece el rol accesible.
inputTag.contentEditable = true; // Permite la edición del contenido.
inputTag.classList.add("input"); // Añade la clase "input" para estilo.
inputTag.focus(); // Pone el foco en el input.

inputTagContainer.classList.add("input-tag-container"); // Añade clase al contenedor del input.
tagsContainer.classList.add("tag-container"); // Añade clase al contenedor de etiquetas.

// Añade el contenedor de etiquetas y el inputTag al contenedor principal.
inputTagContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTag);

// Añade un evento de clic al contenedor de entrada de etiquetas.
inputTagContainer.addEventListener("click", e => {
    // Verifica si el clic fue en el contenedor de entrada o en el contenedor de etiquetas.
    if (e.target.id === "input-tag" || e.target.classList.contains("tag-container")) {
        inputTag.focus(); // Si es así, pone el foco en el inputTag.
    }
});

// Añade un evento de teclado al input de etiquetas.
inputTag.addEventListener("keydown", e => {
    // Verifica si la tecla presionada es "Enter" y si hay contenido en inputTag.
    if (e.key === "Enter" && inputTag.textContent !== "") {
        // Verifica si la etiqueta no ya existe.
        if (!existsTags(inputTag.textContent)) {
            e.preventDefault(); // Previene el comportamiento por defecto del Enter.
            tags.push(inputTag.textContent); // Agrega el texto del input al array de tags.
        }
        inputTag.textContent = ""; // Limpia el contenido del input para una nueva etiqueta.
        renderTags(); // Llama a la función para renderizar las etiquetas.
    }

    // Verifica si se presiona la tecla "Backspace" y si el input está vacío y hay etiquetas.
    if (e.key === "Backspace" && inputTag.textContent === "" && tags.length > 0) {
        tags.pop(); // Elimina la última etiqueta del array tags.
        renderTags(); // Renderiza las etiquetas actualizadas.
    }
});

// ______________FUNCTION RENDERTAGS_____________________
function renderTags() {
    tagsContainer.innerHTML = ""; // Limpia el contenedor de etiquetas.

    // Mapea cada etiqueta en un nuevo elemento HTML.
    const html = tags.map(tag => {
        const tagElement = document.createElement("div"); // Crea un contenedor div para la etiqueta.
        const tagButton = document.createElement("button"); // Crea un botón para eliminar la etiqueta.
        tagElement.classList.add("tag-item"); // Añade clase para estilo.
        tagButton.textContent = "X"; // Establece el texto del botón.

        // Añade un evento de clic al botón para eliminar la etiqueta.
        tagButton.addEventListener("click", e => {
            removeTags(tag); // Llama a la función removeTags con la etiqueta.
        });

        // Añade el texto de la etiqueta y el botón al contenedor de la etiqueta.
        tagElement.appendChild(document.createTextNode(tag));
        tagElement.appendChild(tagButton);
        return tagElement; // Devuelve el elemento de etiqueta creado.
    });

    // Añade cada elemento HTML de etiquetas al contenedor de etiquetas.
    html.forEach(element => {
        tagsContainer.appendChild(element);
    });
    
    // Vuelve a añadir el inputTag al contenedor de etiquetas.
    tagsContainer.appendChild(inputTag);
    inputTag.focus(); // Vuelve a poner el foco en el input.
}

// ______________FUNCTION EXISTSTAGS___________________
function existsTags(value) {
    return tags.includes(value); // Devuelve verdadero si la etiqueta ya existe en el array.
}

// ______________FUNCTION REMOVETAGS______________
function removeTags(value) {
    tags = tags.filter(tag => tag != value); // Filtra las etiquetas para eliminar la especificada.
    renderTags(); // Renderiza las etiquetas actualizadas.
}
