import validator from "./validator.js";

const formulario = document.querySelector("#formulario-tarjeta");

// eslint-disable-next-line no-undef
$(function () {
  // eslint-disable-next-line no-undef
  $('[data-toogle="tooltip"]').tooltip();
});

//*Select del mes generado dinamicamente
for (let i = 1; i <= 12; i++) {
  let opcion = document.createElement("option");
  opcion.value = i;
  opcion.innerText = i;
  formulario.selectMes.appendChild(opcion);
}

//*Select del año generado dinamicamente
const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
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
    .replace(/\s/g, "")
    //*Eliminar las letras
    .replace(/\D/g, "")
    //*Elimina el ultimo espaciado
    .trim();
});

//*Input Nombre de tarjeta
formulario.inputNombre.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;

  formulario.inputNombre.value = valorInput.replace(/[0-9]/g, "");
});

//*Input Email de tarjeta
formulario.inputEmail.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;

  formulario.inputEmail.value = valorInput;
});

//*Input Usuario Platzi de tarjeta
formulario.inputUserPlatzi.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;

  formulario.inputUserPlatzi.value = valorInput;
});

//*CCV
formulario.inputCCV.addEventListener("keyup", () => {
  formulario.inputCCV.value = formulario.inputCCV.value
    // Eliminar los espacios
    .replace(/\s/g, "")
    // Eliminar las letras
    .replace(/\D/g, "");
});

//funciones para validar información de la tarjeta

document.getElementById("btnFormulario").addEventListener("click", () => {
  const creditCardNumber = document.getElementById("inputNumero").value;
  tarjetaValida(creditCardNumber);
  mascaraNumero(creditCardNumber);
  const mensaje = tarjetaValida(creditCardNumber);
  const confirmacion = document.getElementById("mensaje-confirmacion");
  const negacion = document.getElementById("mensaje-negacion");
  if (mensaje) {
    let exito = document.createElement("h6");
    exito.innerText =
      "Hola, tu tarjeta: " + validator.maskify(creditCardNumber) + " es Válida";
    confirmacion.style.display = "block";
    confirmacion.appendChild(exito);
    setTimeout(() => {
      confirmacion.style.display = "none";
      // eslint-disable-next-line no-undef
      $("#modalCompra").modal("hide");
      // eslint-disable-next-line no-undef
      $("body").removeClass("modal-open");
      // eslint-disable-next-line no-undef
      $(".modal-backdrop").remove();
    }, 5000);
  } else {
    let exito = document.createElement("h6");
    exito.innerText =
      "Hola, tu tarjeta: " +
      validator.maskify(creditCardNumber) +
      " es Inválida";
    negacion.style.display = "block";
    negacion.appendChild(exito);
    setTimeout(() => {
      negacion.style.display = "none";
    }, 5000);
  }
});
const tarjetaValida = (creditCardNumber) => {
  const valida = validator.isValid(creditCardNumber);
  if (valida === true) {
    return true;
  } else {
    return false;
  }
};

const mascaraNumero = (creditCardNumber) => {
  document.getElementById("inputNumero").value =
    validator.maskify(creditCardNumber);
};
