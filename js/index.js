class Persona {
    constructor(nombreApellido, telefono, email, tipoPC =[]) {
        this.nombreApellido = nombreApellido;
        this.telefono = telefono;
        this.email = email;
        this.tipoPC = tipoPC =[];
    }
    pedirDatos() {
        this.nombreApellido = prompt("Hola, ingresa tu Nombre y Apellido:");
        this.telefono = prompt("Ingresa un número de teléfono:");
        while(isNaN(this.telefono)){
            this.telefono = prompt("Ingresa un número de teléfono válido:");
        }
        this.email = prompt("Ingresa un email:");
        while(this.email.includes("@") == false){
            this.email = prompt("Ingresa un email válido:");
        }
        let cont=0;
        let seguir = null;
        let equipo = null;
        do{
            if(cont == 0){
                equipo = prompt("¿Que tipo de equipo deseas arreglar? ¿Notebook o Desktop PC?, si deseas agregar mas de un equipo, colocale un nombre descriptivo (Ej: Notebook Juan):");
                this.tipoPC.push(equipo)
            }
            else{
                equipo = prompt("Ingresa el nombre del otro equipo que deseas arreglar:");
                this.tipoPC.push(equipo)
            }
            cont++;
            seguir = prompt("Ingrese SI, si desea agregar otro equipo:")
        }while(seguir.toLowerCase() == "si")
    }
    datos() {
        document.getElementById("bienvenida").innerHTML = ("Bienvenido " + this.nombreApellido);
        document.getElementById("datos").innerHTML = ("Los datos que ingresaste fueron los siguientes: ");
        const ulDatos = document.getElementById("listaDatos");
        let cont = 0;
        for(const datoDeObjeto in persona1){
            const liDatos = document.createElement("li");
            switch(cont){
                case 0:
                    liDatos.innerHTML = (`<strong>Nombre y Apellido: </strong>` + persona1[datoDeObjeto]);
                    ulDatos.appendChild(liDatos);
                    break;
                case 1:
                    liDatos.innerHTML = (`<strong>Teléfono: </strong>` + persona1[datoDeObjeto]);
                    ulDatos.appendChild(liDatos);
                    break;
                case 2:
                    liDatos.innerHTML = (`<strong>Email: </strong>` + persona1[datoDeObjeto]);
                    ulDatos.appendChild(liDatos);
                    break;
                case 3:
                    liDatos.innerHTML = (`<strong>Equipos: </strong>` + persona1[datoDeObjeto].join(", "));
                    ulDatos.appendChild(liDatos);
                    break;
            }
            cont++;
        }
    }
}
class Servicio {
    constructor(nombre, precio, horas, total) {
        this.nombre = nombre;
        this.precio = precio;
        this.horas = horas;
        this.total = total;
    }
    final() {
        this.total = this.precio * this.horas;
        this.total = this.total * 1.21;
    }
}
class Cupon{
    constructor(cupon, totalPagar){
        this.cupon = cupon;
        this.totalPagar = totalPagar;
    }
    descuento(){
        const desct = (a, b) => a*b;
        let porct = 0;
        switch(this.cupon){
            case "DCTO10":
                porct = 0.9
                dct = desct(this.totalPagar,porct);
                console.log("Ingresaste un Cupón de descuento de 10%")
                break;
            case "DCTO20":
                porct = 0.8
                dct = desct(this.totalPagar,porct);
                console.log("Ingresaste un Cupón de descuento de 20%")
                break;
            case "DCTO30":
                porct = 0.7
                dct = desct(this.totalPagar,porct);
                console.log("Ingresaste un Cupón de descuento de 30%")
                break;
            default:
                break;
        }
    }
    subtotal(){
        if(dct != null){
            console.log("El total a pagar con el IVA incluido y el descuento por cupón aplicado es: " + dct + " ARS")
        }
        else{
            console.log("El total a pagar con el IVA incluido: " + totalPagar + " ARS")
        }
        console.log("Te estaremos contactando vía email y telefónicamente... ¡Muchas gracias!")
    }

}
class Cotización{
    constructor(nombreApellido, equipo, servicios, totalFinal){
        this.nombreApellido = nombreApellido;
        this.equipo = equipo;
        this.servicios = servicios;
        this.totalFinal = totalFinal;
    }
    resultado(){
        const parrafoCotizados = document.createElement("p");
        parrafoCotizados.innerHTML = (this.nombreApellido + ", los servicios cotizados para el equipo " + this.equipo + " fueron los siguientes: " + this.servicios + ". Y el total Cotizado es: " + this.totalFinal + " ARS");
        document.body.appendChild(parrafoCotizados);
    }
}
function suma(n1) {
    final += n1;
}

let final = 0;
const persona1 = new Persona();
persona1.pedirDatos();
persona1.datos();
const serviciosJuntos = [];
let totalPagar = 0;
let i = persona1.tipoPC.length;
let seguir = null;
for (f=0; f<i; f++){
    cont = 0;
    do {
        let nombreServicio = parseInt(prompt("Ingrese el número del servicio que deseas cotizar para el equipo " + persona1.tipoPC[f] + " ==> 1- Formateo | 2- Instalacion de Programas | 3- Virus | 4- Revisión:"));
        switch (nombreServicio) {
            case 1:
                nombreServicio = "Formateo";
                const formateo = new Servicio(nombreServicio, 200, 8, 0)
                formateo.final()
                suma(formateo.total);
                serviciosJuntos.push(nombreServicio);
                break;
            case 2:
                nombreServicio = "Instalación de Programas";
                const programas = new Servicio(nombreServicio, 180, 4, 0)
                programas.final()
                suma(programas.total);
                serviciosJuntos.push(nombreServicio);
                break;
            case 3:
                nombreServicio = "Limpieza de  Virus";
                const virus = new Servicio(nombreServicio, 150, 2, 0)
                virus.final()
                suma(virus.total);
                serviciosJuntos.push(nombreServicio);
                break;
            case 4:
                nombreServicio = "Revisión";
                const revision = new Servicio(nombreServicio, 120, 2, 0)
                revision.final()
                suma(revision.total);
                serviciosJuntos.push(nombreServicio);
                break;
            default:
                while (isNaN(nombreServicio) || (nombreServicio > 4) || (nombreServicio < 1)) {
                    nombreServicio = prompt("Ingrese un número válido del servicio que deseas cotizar para el equipo " + persona1.tipoPC[f] + " ==> 1- Formateo | 2- Instalacion de Programas | 3- Virus | 4- Revisión:");
                }
                break;
        }
        cont++;
        seguir = prompt("¿Desea cotizar otro servicio para el equipo " + persona1.tipoPC[f] + "?");
    } while (seguir.toLowerCase() == "si")
    const cotiFinal = new Cotización(persona1.nombreApellido, persona1.tipoPC[f], serviciosJuntos.join(", "), final);
    cotiFinal.resultado();
    serviciosJuntos.length = 0;
    totalPagar += final;
    final = 0;
}
let cupon = prompt("¿Tiene algún cupón de descuento? Ingreselo (DCTO10, DCTO20 o DCTO30) o deje el espacio en blanco y presione aceptar");
const cup = new Cupon(cupon, totalPagar);
let dct = null;
cup.descuento();
cup.subtotal();