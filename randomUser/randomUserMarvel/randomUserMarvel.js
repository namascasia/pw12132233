let paginaActual = 0;
let quantityPersonajes = 0;
let personajes = [];

const getPersonajes = async()=>{
    quantityPersonajes = document.getElementById("cantidadPersonajes").value;
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
    showPersonajes();
}

const nextPersonaje = () =>{
    paginaActual++;
    console.log({paginaActual, quantityPersonajes});
    if(paginaActual == quantityPersonajes ) {
        paginaActual = 0;
    }
    showPersonajes();
}

const showPersonajes = () =>{
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let image = document.getElementById("fotoPersonaje");

    image.setAttribute("src", personajes[paginaActual].thumbnail.path + "." + personajes[paginaActual].thumbnail.extension);
    name.innerHTML = personajes[paginaActual].name;
    description.innerHTML = personajes[paginaActual].description;
}