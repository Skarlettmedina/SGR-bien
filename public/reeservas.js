let sala1 = "Sala 1";
let sala2 = "Sala 2";
let sala3 = "Sala 3";

let seleccion = document.getElementById("espacio");
let descripcion = document.getElementById("contenedor_text");
let formulario = document.getElementById("formulario-reserva");
let hora_inicio = document.getElementById("hora_inicio");
let hora_fin = document.getElementById("hora_fin");
let fecha = document.getElementById("fecha");
let modal = document.getElementById("modal");
let abrirModal = document.getElementById("reservar");
let cerrarModal = document.getElementById("cerrarModal")
let datos = [];
let validar = false;

 seleccion.addEventListener("change", () => {
    descripcion.innerHTML = "";
    switch (seleccion.value) {
        case "sala1":
            let texto1 = document.createElement("p");
            texto1.textContent = sala1;
            descripcion.appendChild(texto1);
            break;
        case "sala2":
            let texto2 = document.createElement("p");
            texto2.textContent = sala2;
            descripcion.appendChild(texto2);
            break;
        case "sala3":
            let texto3 = document.createElement("p");
            texto3.textContent = sala3;
            descripcion.appendChild(texto3);
            break;
        }
 });

 fecha.addEventListener("change", async () =>{
    let fechaSel = fecha.value;
    let espacioSel = espacio.value;

    const salida = await fetch(`http://localhost:3000/api/reservas/horarios?fecha=${fechaSel}&espacio=${espacioSel}`);
    const horarios = await salida.json();
    if (!fechaSel || !espacioSel) return;
    console.log(horarios)
    datos = horarios
 })

 hora_inicio.addEventListener("change", async ()=>{
    console.log(datos.inicio.length)
    for(let i = 0; i < datos.inicio.length; i++){
        if(hora_inicio.value < datos.inicio[i]){
            hora_fin.style.display = "inline"
        }else if(hora_inicio > datos.final[i]){
            hora_fin.style.display = "inline"
        }
    }
    if(datos.inicio.length < 1){
            hora_fin.style.display = "inline"
        }
 })

 hora_fin.addEventListener("change", ()=>{
      for(let i = 0; i < datos.inicio.length; i++){
        if(hora_inicio.value <= datos.inicio[i]){
            if(hora_fin.value > datos.inicio[i]){
                validar = true
                
            }
        }else if(hora_inicio.value > datos.inicio[i]){
            if(hora_inicio.value < datos.final[i]){
                validar = true
            }
        }
    }
    if(validar == true){
        console.log("no esta disponible")
        hora_fin.value = ""
        reservar.addEventListener("click", ()=>{
            modal.showModal();
            modal.innerHTML =
            `
            <div>
                <h2>Horario no disponible</h2>
                <h4>Estos son los rangos de horas reservados en ${espacio.value}; seleccionar un rango de fecha fuera de estos. </h1>
                <label>hora inicio</label>
                <p>${datos.inicio}</p>

                <label>hora final</label>
                <p>${datos.final}</p>
            </div>
             `
    })

        cerrarModal.addEventListener("click", ()=>{
            modal.close();
    })
    }
 })


 formulario.addEventListener("submit", async(e) => {
    e.preventDefault();
    let espacio = document.getElementById("espacio").value;
    let actividad = document.getElementById("actividad").value;
    let usuario = document.getElementById("usuario").value;
    let descripcion = document.getElementById("descripcion").value;
    let fecha = document.getElementById("fecha").value;
    let hora_inicio= document.getElementById("hora_inicio").value;
    let hora_fin = document.getElementById("hora_fin").value;

    const respuesta = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            espacio,
            actividad,
            usuario,
            descripcion,
            fecha,
            hora_inicio,
            hora_fin
        })
    })
    const resultado = await respuesta.json();
    if (resultado.mensaje === 'Reserva creada exitosamente') {
        alert(fecha);
    } else {
        alert(fecha);
    }
 });

