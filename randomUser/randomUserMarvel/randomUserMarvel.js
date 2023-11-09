let paginaActual = 0;
let quantityPersonajes = 0;
let personajes = [];

const getPersonajes = async()=>{
    quantityPersonajes = document.getElementById("cantidadPersonajes").value;
    if(quantityPersonajes == 0) {
        alert('Agregue una cantidad que quiera visualizar de personajes');
        return;
    }
    const resp = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=67788e74df746a1523d8ebb504ee1008&hash=cf5ec9bfa5a156f031a69417cd0e012c&limit=${quantityPersonajes}`); 
    const {data} = await resp.json();
    personajes = data.results;
    // console.log(personajes);
    showPersonajes();
}

const previousPersonaje = () =>{
    paginaActual--;
    if(paginaActual < 0 ) {
        paginaActual = quantityPersonajes - 1;
    }
    // let previous = document.getElementById("previousPersonaje");
    // previous.innerText = `Prev ${paginaActual}`;
    showPersonajes();
}

const nextPersonaje = () =>{
    paginaActual++;
    if(paginaActual == quantityPersonajes ) {
        paginaActual = 0;
    }
    // let next = document.getElementById("nextPersonaje");
    // next.innerText = `Next ${paginaActual}`;
    showPersonajes();
}

const showPersonajes = () =>{
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let image = document.getElementById("fotoPersonaje");
    let page = document.getElementById("paginaActual");

    image.setAttribute("src", personajes[paginaActual].thumbnail.path + "." + personajes[paginaActual].thumbnail.extension);
    name.innerHTML = personajes[paginaActual].name;
    description.innerHTML = personajes[paginaActual].description;
    page.innerHTML = `${paginaActual + 1}/${quantityPersonajes}`;
}