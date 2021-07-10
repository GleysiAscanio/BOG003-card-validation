import validator from './validator.js';


const tarjeta = document.querySelector("#tarjeta"), 
      formulario = document.querySelector("#formulario-tarjeta"),
      numeroTarjeta = document.querySelector("#tarjeta .numero"), 
      nombreTarjeta = document.querySelector("#tarjeta .nombre"),
      firma = document.querySelector("#tarjeta .firma p"),
      mesExpiracion = document.querySelector("#tarjeta .mes"),
      yearExpiracion = document.querySelector("#tarjeta .year"),
      ccv = document.querySelector("#tarjeta .ccv"),
      btnEnviar = document.querySelector("#btn-enviar .btnFormulario");

//*Select del mes generado dinamicamente
for(let i = 1; i <= 12; i++){
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion); 
}   


//*Select del año generado dinamicamente
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual +8; i++) {
    let opcion = document.createElement("option");
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion); 
}

//*Input numero de tarjeta
formulario.inputNumero.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
    .replace(/^\d{16,19} $ /)
	//*Eliminamos espacios en blanco
	.replace(/\s/g, '')
	//*Eliminar las letras
	.replace(/\D/g, '')
	//*Elimina el ultimo espaciado
	.trim();

    numeroTarjeta.textContent = valorInput;

    if(valorInput == ""){
        numeroTarjeta.textContent = "#### #### #### ###"
    }
});

//*Input Nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Daniel Torres';
	}

});

//*Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
});

//*Select año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
});

//*CCV
formulario.inputCCV.addEventListener('keyup', (e) => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});

        //funciones para validar y enmascarar tarjeta

document.getElementById("btnFormulario").addEventListener("click", () => {
    let creditCardNumber = document.getElementById("inputNumero").value;
    tarjetaValida(creditCardNumber);
    mascaraNumero(creditCardNumber);
 
 });

    function tarjetaValida(creditCardNumber) {
        let valida = validator.isvalid(creditCardNumber) 
        if (valida === true) {
                return alert ("Hola, tu tarjeta: " + validator.maskify(creditCardNumber) + " es Valida");
         } else {
         return alert ("Hola, tu tarjeta es invalida" );
        }
}

    function mascaraNumero(creditCardNumber) {
        document.getElementById("inputNumero").value = validator.maskify(creditCardNumber);
    
};

        // Mensaje Final a Usuario

formulario.addEventListener('submit', () =>{
    alert('Gracias por Preferirnos');
});


