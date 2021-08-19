function existeListaUsuarios() {
    let existe = false;
    if (localStorage.getItem("Usuarios") != null) {
        existe = true;
    }
    return existe;
}

function crearListaUsuarios() {
    localStorage.setItem("Usuarios", JSON.stringify([]));
}

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("Usuarios"));
}

function guardarUsuarios(listaDeUsuarios) {
    localStorage.setItem("Usuarios", JSON.stringify(listaDeUsuarios));
}

class Persona {
    constructor(usuarioNuevo) {
        this.nombre = usuarioNuevo.nombre;
        this.apellido = usuarioNuevo.apellido;
        this.dni = usuarioNuevo.dni;
        this.telefono = usuarioNuevo.telefono;
        this.email = usuarioNuevo.email;
    }
}

function cargarUsuario(usuarioACargar) {
    const arrayDeStorage = obtenerUsuarios();
    const dniIngresado = usuarioACargar["dni"];
    let marcador = null;
    for (const contenidoArrayStorage of arrayDeStorage){
        for(const usuarioDeStorage in contenidoArrayStorage){
            if(contenidoArrayStorage[usuarioDeStorage] == dniIngresado){
                marcador = "existe";
                break;
            }
        }
    }
    if(marcador != "existe"){
        arrayDeStorage.push(usuarioACargar);
        guardarUsuarios(arrayDeStorage);
    }
}

function mostrarDatosPersonales() {
    document.getElementById("datos").innerHTML = ("Los Datos que ingresaste fueron los siguientes: ");
    const ulDatos = document.getElementById("listaDatos");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const dni = document.getElementById("dni");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const liDatos1 = document.createElement("li");
    liDatos1.innerHTML = (`<strong>Nombre y Apellido: </strong>` + nombre.value + " " + apellido.value);
    ulDatos.appendChild(liDatos1);
    const liDatos2 = document.createElement("li");
    liDatos2.innerHTML = (`<strong>DNI: </strong>` + dni.value);
    ulDatos.appendChild(liDatos2);
    const liDatos3 = document.createElement("li");
    liDatos3.innerHTML = (`<strong>Teléfono: </strong>` + telefono.value);
    ulDatos.appendChild(liDatos3);
    const liDatos4 = document.createElement("li");
    liDatos4.innerHTML = (`<strong>Email: </strong>` + email.value);
    ulDatos.appendChild(liDatos4);
    document.getElementById("datosDeEquipos").innerHTML = ("Por Favor llena el siguiente formulario con la información correspondiente:");
    const parrafoDatosPersonales = document.getElementById("datosPersonales");
    parrafoDatosPersonales.innerHTML = (`<p><strong>- Cliente: </strong>` + nombre.value + " " + apellido.value + `</p>` + `<p><strong>- DNI: </strong>` + dni.value + `</p>` + `<p><strong>- Teléfono: </strong>` + telefono.value + `</p>` + `<p><strong>- Email: </strong>` + email.value + `</p>`);
}

class Servicio {
    constructor(nombreServicio, precio, horas, total) {
        this.nombreServicio = nombreServicio;
        this.precio = precio;
        this.horas = horas;
        this.total = total;
    }
    final() {
        this.total = this.precio * this.horas;
        this.total = this.total * 1.21;
    }
}

function obtenerDatosServicio() {
    const formateo = document.getElementById("checkFormateo");
    if (formateo.checked == true) {
        serviciosJuntos.push(formateo.value);
    }
    const programas = document.getElementById("checkProgramas");
    if (programas.checked == true) {
        serviciosJuntos.push(programas.value);
    }
    const virus = document.getElementById("checkVirus");
    if (virus.checked == true) {
        serviciosJuntos.push(virus.value);
    }
    const revision = document.getElementById("checkRevision");
    if (revision.checked == true) {
        serviciosJuntos.push(revision.value);
    }
}

function suma(n1) {
    final += n1;
}

function calculoValorServicios(equipoAArreglar) {
let i = 0;
i = serviciosJuntos.length;
for (f = 0; f < serviciosJuntos.length; f++) {
    switch (serviciosJuntos[f]) {
        case "Formateo":
            const formateo = new Servicio(serviciosJuntos[f], 200, 8, 0)
            formateo.final()
            suma(formateo.total);
            break;
        case "Instalación de Programas":
            const programas = new Servicio(serviciosJuntos[f], 180, 4, 0)
            programas.final()
            suma(programas.total);
            break;
        case "Limpieza de  Virus":
            const virus = new Servicio(serviciosJuntos[f], 150, 2, 0)
            virus.final()
            suma(virus.total);
            break;
        case "Revisión":
            const revision = new Servicio(serviciosJuntos[f], 120, 2, 0)
            revision.final()
            suma(revision.total);
            break;
    }
}
const parrafoDatosEquipo = document.getElementById("datosEquipo");
if(equipoAArreglar == "Selecciona"){
    equipoAArreglar = " ";
}
parrafoDatosEquipo.innerHTML = (`<p><strong>- Equipo: </strong>` + equipoAArreglar + `</p>`+ `<p><strong>- Servicios: </strong>` +serviciosJuntos.join(", ") + `</p>`);
}

function obtenerDatosEquipo() {
    const equipoSeleccionado = document.getElementById("tipoDeComputadora").options[document.getElementById('tipoDeComputadora').selectedIndex].value;
    return equipoSeleccionado;
}

function metodoDeContacto() {
    let viaDeContacto = null;
    const contactoTelefono = document.getElementById("checkTelefono");
    if (contactoTelefono.checked == true) {
        viaDeContacto = contactoTelefono.value;
    }
    const contactoEmail = document.getElementById("checkEmail");
    if (contactoEmail.checked == true) {
        viaDeContacto = contactoEmail.value;
    }
    return viaDeContacto;
}

class Cotizacion {
    constructor(cupon, totalPagar) {
        this.cupon = cupon;
        this.totalPagar = totalPagar;
    }
    descuento() {
        const desct = (a, b) => a * b;
        let nombreCupon = null;
        let porct = 0;
        switch (this.cupon) {
            case "DCTO10":
                porct = 0.9
                nombreCupon = "10%";
                dct = desct(this.totalPagar, porct);
                break;
            case "DCTO20":
                porct = 0.8
                nombreCupon = "20%";
                dct = desct(this.totalPagar, porct);
                break;
            case "DCTO30":
                porct = 0.7
                nombreCupon = "30%";
                dct = desct(this.totalPagar, porct);
                break;
            default:
                break;
        }
        return nombreCupon;
    }
    subtotal(nombreCupon, contacto) {
        if (dct != null) {
            const parrafoCotizados = document.getElementById("costoServicio");
            parrafoCotizados.innerHTML = (`<p>El total a pagar con el IVA incluido y el descuento por cupón aplicado de ` + nombreCupon + ` es: ` + `<strong>` + dct + `</strong>` + ` ARS</p>`);
        }
        else {
            const parrafoCotizados = document.getElementById("costoServicio");
            parrafoCotizados.innerHTML = (`<p>El total a pagar con el IVA incluido es: ` + `<strong>` + this.totalPagar + `</strong>` + ` ARS</p>`);
        }
        const parrafoMetodoContacto = document.getElementById("contactoMetodo");
        parrafoMetodoContacto.innerHTML = (`<p>Te estaremos contactando vía ` + contacto + ` ... ¡Muchas gracias!</p>`);
    }
}

function cuponDescuento(contMet) {
    const cuponIngresado = document.getElementById("cupon");
    const cotizacionFinal = new Cotizacion(cuponIngresado.value, final);
    nombCup = cotizacionFinal.descuento();
    cotizacionFinal.subtotal(nombCup, contMet);
}

function textoObservaciones() {
    const observaciones = document.getElementById("observaciones").value;
    if(observaciones.length != 0){
        const parrafoObservaciones = document.getElementById("observacionesCliente");
        parrafoObservaciones.innerHTML = (`<p><strong>Observaciones: </strong>` + observaciones + `</p>`);
    }
}

function clickGuardarYSiguiente() {

    if (!existeListaUsuarios()) {
        crearListaUsuarios();
    }
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const dni = document.getElementById("dni");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    
    const nuevoUsuario = new Persona({
        nombre: nombre.value,
        apellido: apellido.value,
        dni: dni.value,
        telefono: telefono.value,
        email: email.value
    });
    mostrarDatosPersonales();
    cargarUsuario(nuevoUsuario);
}

function clickYEnviar() {
    let equipo = obtenerDatosEquipo();
    obtenerDatosServicio();
    calculoValorServicios(equipo);
    contMet = metodoDeContacto();
    cuponDescuento(contMet);
    textoObservaciones();
}



const serviciosJuntos = [];
let final = 0;
let dct = null;
const botonGuardar = document.getElementById("guardar");
botonGuardar.addEventListener("click", clickGuardarYSiguiente);
const botonEnviar = document.getElementById("enviar");
botonEnviar.addEventListener("click", clickYEnviar);