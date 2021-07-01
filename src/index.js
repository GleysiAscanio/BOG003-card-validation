import validator from './validator.js';

console.log(validator);

const tarjeta = document.querySelector('#tarjeta'),
      btnabrirformulario = document.querySelector('#btn-abrir-formulario'),
      formulario = document.querySelector('formulario-tarjeta');

tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});

btnabrirformulario.addEventListener('click', () => {
    btnabrirformulario.classList.toggle('active');
    formulario.classList.toggle('active');
});