let datos = [];
let contenedor = document.getElementById("contenedor");
let busqueda = document.getElementById("buscar");
let estado1 = "🟢";
let estado2 = "🔴";
let estado3 = "🟡";
let defEstado= ""

window.addEventListener("load", async () => {
    const salida = await fetch("http://localhost:3000/api/reservas");
    const reservas = await salida.json();
    console.log(reservas);
    datos = reservas;

});

function crear (reservas) {
    contenedor.innerHTML = ""
    if(reservas.length == 0){
        console.log("No hay productos")
    }else{
        console.log(reservas)
        for(let i = 0; i < reservas.length; i++) {
              if(reservas[i].estado == 1){
                    defEstado = `${estado1} Revision`
                }else if(reservas[i].estado == 2){
                    defEstado = `${estado2} Cerrado`
                }else if(reservas[i].estado == 2){
                    defEstado = `${estado3} Abierto`
                }
            let reserva = document.createElement("div");
            reserva.classList.add("reserva");
            contenedor.appendChild(reserva);
            let divH2 = document.createElement("div");
            divH2.classList.add("divH2")
            reserva.appendChild(divH2);
            let h2 = document.createElement("h2");
            h2.textContent = reservas[i].espacio;
            divH2.appendChild(h2);
            let estado = document.createElement("p")
            estado.textContent = defEstado
            divH2.appendChild(estado);
            let p1 = document.createElement("p");
            p1.textContent = `Actividad: ${reservas[i].actividad}`;
            reserva.appendChild(p1);
            let p2 = document.createElement("p");
            p2.textContent = `Usuario: ${reservas[i].usuario}`;
            reserva.appendChild(p2);
            let p3 = document.createElement("p");
            p3.textContent = `Descripción: ${reservas[i].descripcion}`;
            p3.classList.add("descripcion")
            reserva.appendChild(p3);
            let footer = document.createElement("div");
            footer.classList.add("footer");
            reserva.appendChild(footer)
            let p4 = document.createElement("p");
            p4.textContent = `Fecha: ${new Date(reservas[i].fecha).toLocaleDateString()}`;
            footer.appendChild(p4);
            let span1 = document.createElement("span");
            span1.textContent = `Hora de inicio: ${reservas[i].hora_inicio}`;
            footer.appendChild(span1);
        }
    }
}

const filtrar = () =>{
    const buscar = busqueda.value.toLowerCase();
    if (buscar === "") {
        contenedor.innerHTML = "";
        return; 
    }
    const filtroReserva = datos.filter((reserva) => reserva.actividad.toLowerCase().startsWith(buscar));
    crear(filtroReserva)
}

crear(datos)

busqueda.addEventListener("input", filtrar)
