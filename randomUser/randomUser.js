
let paginaActual = 0;
let quantityUsers = 0;
let users = [];

async function apiRandomUser(){
    
    quantityUsers = document.getElementById("cantidad").value;
    const resp = await fetch("https://randomuser.me/api/?results=" + quantityUsers);
    users = await resp.json();
    mostrarUsuario();
}

const mostrarUsuario = () => {    

    let foto = document.getElementById('foto');
    let nombre = document.getElementById('nombre');
    let telefono = document.getElementById('telefono');

    foto.setAttribute("src", users.results[paginaActual].picture.large);
    nombre.innerHTML = users.results[paginaActual].name.first + " " + users.results[paginaActual].name.last;
    telefono.innerHTML = users.results[paginaActual].phone;
}

const previousUser = () =>{
    paginaActual--;
    if(paginaActual < 0 ) {
        paginaActual = quantityUsers - 1;
    }
    mostrarUsuario();
}

const nextUser = () =>{
    paginaActual++;
    if(paginaActual == quantityUsers){
        paginaActual = 0;
    }
    mostrarUsuario();
}
