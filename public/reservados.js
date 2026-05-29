let datos = [];
let contenedor = document.getElementById("contenedor");
let busqueda = document.getElementById("buscar");

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
            let reserva = document.createElement("div");
            reserva.classList.add("reserva");
            contenedor.appendChild(reserva);
            let h2 = document.createElement("h2");
            h2.textContent = reservas[i].espacio;
            reserva.appendChild(h2);
            let p1 = document.createElement("p");
            p1.textContent = `Actividad: ${reservas[i].actividad}`;
            reserva.appendChild(p1);
            let p2 = document.createElement("p");
            p2.textContent = `Usuario: ${reservas[i].usuario}`;
            reserva.appendChild(p2);
            let p3 = document.createElement("p");
            p3.textContent = `Descripción: ${reservas[i].descripcion}`;
            reserva.appendChild(p3);
            let p4 = document.createElement("p");
            p4.textContent = `Fecha: ${new Date(reservas[i].fecha).toLocaleDateString()}`;
            reserva.appendChild(p4);
            let span1 = document.createElement("span");
            span1.textContent = `Hora de inicio: ${reservas[i].hora_inicio}`;
            reserva.appendChild(span1);
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
