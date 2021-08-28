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
    for (const contenidoArrayStorage of arrayDeStorage) {
        for (const usuarioDeStorage in contenidoArrayStorage) {
            if (contenidoArrayStorage[usuarioDeStorage] == dniIngresado) {
                marcador = "existe";
                break;
            }
        }
    }
    if (marcador != "existe") {
        arrayDeStorage.push(usuarioACargar);
        guardarUsuarios(arrayDeStorage);
    }
}

function mostrarDatosPersonales() {
    $("#datos").text("Los Datos que ingresaste fueron los siguientes: ");
    const ulDatos = $("#listaDatos");
    const nombre = $("#nombre");
    const apellido = $("#apellido");
    const dni = $("#dni");
    const telefono = $("#telefono");
    const email = $("#email");
    a = nombre.length;
    ulDatos.append(`<li><strong>Nombre y Apellido: </strong> ${nombre.val()} ${apellido.val()}</li>`);
    ulDatos.append(`<li><strong>DNI: </strong>${dni.val()}</li>`);
    ulDatos.append(`<li><strong>Teléfono: </strong>${telefono.val()}</li>`);
    ulDatos.append(`<li><strong>Email: </strong>${email.val()}</li>`);
    $("#datosDeEquipos").text("Por Favor llena el siguiente formulario con la información correspondiente:");
    $("#datosPersonales").html(`<p><strong>- Cliente: </strong>${nombre.val()} ${apellido.val()}</p>
    <p><strong>- DNI: </strong>${dni.val()}</p>
    <p><strong>- Teléfono: </strong>${telefono.val()}</p>
    <p><strong>- Email: </strong>${email.val()}</p>`);
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
    if ($("#checkFormateo").prop('checked') == true) {
        serviciosJuntos.push($("#checkFormateo").val());
    }
    if ($("#checkProgramas").prop('checked') == true) {
        serviciosJuntos.push($("#checkProgramas").val());
    }
    if ($("#checkVirus").prop('checked') == true) {
        serviciosJuntos.push($("#checkVirus").val());
    }
    if ($("#checkRevision").prop('checked') == true) {
        serviciosJuntos.push($("#checkRevision").val());
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
            case "Limpieza de Virus":
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
    const parrafoDatosEquipo = $("#datosEquipo");
    if (equipoAArreglar == "Selecciona") {
        equipoAArreglar = " ";
    }
    parrafoDatosEquipo.html(`<p><strong>- Equipo: </strong>${equipoAArreglar}</p>
<p><strong>- Servicios: </strong>${serviciosJuntos.join(", ")}</p>`);
}

function obtenerDatosEquipo() {
    const equipoSeleccionado = $("#tipoDeComputadora option:selected").val();
    return equipoSeleccionado;
}

function metodoDeContacto() {
    let viaDeContacto = null;
    if ($("#checkTelefono").prop('checked') == true) {
        viaDeContacto = $("#checkTelefono").val();
    }
    if ($("#checkEmail").prop('checked') == true) {
        viaDeContacto = $("#checkEmail").val();
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
            $("#costoServicio").html(`<p>El total a pagar con el IVA incluido y el descuento por cupón aplicado de ${nombreCupon} es: <strong>${dct}</strong> ARS</p>`);
        }
        else {
            $("#costoServicio").html(`<p>El total a pagar con el IVA incluido es: <strong>${this.totalPagar}</strong> ARS</p>`);
        }
        $("#contactoMetodo").html(`<p>Te estaremos contactando vía ${contacto}... ¡Muchas gracias!</p>`);
    }
}

function cuponDescuento(contMet) {
    const cuponIngresado = $("#cupon").val();
    const cotizacionFinal = new Cotizacion(cuponIngresado, final);
    nombCup = cotizacionFinal.descuento();
    cotizacionFinal.subtotal(nombCup, contMet);
}

function textoObservaciones() {
    const observaciones = $("#observaciones").val();
    if (observaciones.length != 0) {
        $("#observacionesCliente").html(`<p><strong>Observaciones: </strong>${observaciones}</p>`);
    }
}

function agregarAlButtonModal() {
    if ((nombre.val().length != 0) && (apellido.val().length != 0) && (dni.val().length != 0) && (email.val().length != 0) && (telefono.val().length != 0)) {
        $("#guardar").attr({
            "data-bs-target": "#toDatosEquipo",
            "data-bs-toggle": "modal",
            "data-bs-dismiss": "modal",
        });
        $("#errorValidacion").text("");
        seguir = 1;
    }
}



const serviciosJuntos = [];
let final = 0;
let dct = null;
let seguir = 0;
const nombre = $("#nombre");
const apellido = $("#apellido");
const dni = $("#dni");
const email = $("#email");
const telefono = $("#telefono");

$("#nombre").blur(function () {
    if (nombre.val().length != 0) {
        $("#nombre").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if (nombre.val().length == 0) {
        $("#nombre").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
});
$("#apellido").blur(function () {
    if (apellido.val().length != 0) {
        $("#apellido").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if (apellido.val().length == 0) {
        $("#apellido").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
});
$("#dni").blur(function () {
    if (dni.val().length != 0) {
        $("#dni").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if (dni.val().length == 0) {
        $("#dni").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
});
$("#email").blur(function () {
    if (email.val().length != 0) {
        $("#email").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if (email.val().length == 0) {
        $("#email").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
});
$("#telefono").blur(function () {
    if (telefono.val().length != 0) {
        $("#telefono").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if (telefono.val().length == 0) {
        $("#telefono").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
});


$("#guardar").click(function () {
    if (!existeListaUsuarios()) {
        crearListaUsuarios();
    }

    const nuevoUsuario = new Persona({
        nombre: nombre.val(),
        apellido: apellido.val(),
        dni: dni.val(),
        telefono: telefono.val(),
        email: email.val()
    });
    if (nombre.val().length == 0) {
        $("#nombre").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
    if (apellido.val().length == 0) {
        $("#apellido").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
    if (dni.val().length == 0) {
        $("#dni").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
    if (telefono.val().length == 0) {
        $("#telefono").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
    if (email.val().length == 0) {
        $("#email").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por favor ingrese correctamente los campos");
    }
    
    if (seguir == 1) {
        mostrarDatosPersonales();
        cargarUsuario(nuevoUsuario);
    }
});

$("#enviar").click(function () {
    let equipo = obtenerDatosEquipo();
    obtenerDatosServicio();
    calculoValorServicios(equipo);
    contMet = metodoDeContacto();
    cuponDescuento(contMet);
    textoObservaciones();
});