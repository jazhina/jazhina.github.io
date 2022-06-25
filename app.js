/* Obteniendo la data del API  */
const api = async () => {
    try {
        const resp = await fetch('https://reqres.in/api/users?page=1');
        const resp2 = await fetch('https://reqres.in/api/users?page=2');
        if(resp.status === 200 & resp2.status === 200){
            const datos = await resp.json();
            const datos2 = await resp2.json();
            // Unir los 2 objetos pero antes convertirlos en Array para concatenarlos.
            const usuariostotal = (datos.data).concat(datos2.data);
            console.log(usuariostotal)
            //LocalStorage
            guardar_localstorage(usuariostotal)
        }
    } catch(error) {
        console.log('Error:' + error)
    }

}

api()
/* FIN API  */

/* INICIO LOCALSTORAGE  */
obtener_localstorage()
function obtener_localstorage(){
    const listar = localStorage.getItem("lista");
    if ( listar == null ) {
        listausu = [];
        console.log("No existe la lista");
    } else {
        listausu = JSON.parse(listar)
        console.log("Perfecto",listausu);    
    }
  return  listausu;
}

function guardar_localstorage(obj) {
    localStorage.setItem("lista", JSON.stringify(obj));
};
guardar_localstorage();
/* FIN LOCALSTORAGE  */

/* COMPONENTE TEMPLATE*/ 
class template extends HTMLElement{
    constructor(){
        super();
    }
    
connectedCallback(){
let mostrarlist = '<div class="container-personas">';
listausu.forEach(e => {
mostrarlist += `<a  href="#Modal${e.id}">
        <article class="card">
        <img src="${e.avatar}" alt="avatar" class="imagen_avatar">
        <div class="card-content">
            <h3>${e.first_name}</h3>
            <p>${e.last_name}</p>
            <p>${e.email}</p>
        </div>
        </article>
        </a>`});
    mostrarlist += '</div>'
    this.innerHTML= mostrarlist;
    }
}

window.customElements.define("component-template", template);
/* FIN COMPONENTE TEMPLATE*/ 

/* COMPONENTE MODAL*/ 
class modal extends HTMLElement{
    constructor(){
        super();
    }
    
connectedCallback(){

let modal="";
   listausu.forEach((i) => {
     console.log(i.id);
     const URLdominio = window.location.href;
       modal += `<div id="Modal${i.id}"  class="modal">
                    <div class="modal-contenido">
                        <a href=${URLdominio} class="cerrar">X</a>
                        <div  class="grid-modal">
                            <div class="grid-item">
                            <h2>${i.first_name}</h2>
                            <p>${i.last_name}</p>
                            <p>${i.email}</p>
                            </div>
                            <div class="grid-item">
                            <img src="${i.avatar}" alt="avatar" class="imagen_avatar_modal">
                            </div>
                        </div>
                    </div>
                </div>`;
      });
      this.innerHTML= modal;
    }
}

window.customElements.define("component-modal", modal);

/* FIN COMPONENTE MODAL*/ 