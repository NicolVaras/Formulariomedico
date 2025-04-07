function calcularDV(rut) {
  let suma = 0;
  let multiplo = 2;

  for (let i = rut.length - 1; i >= 0; i--) {
    suma += parseInt(rut.charAt(i)) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = 11 - (suma % 11);
  if (resto === 11) return "0";
  if (resto === 10) return "K";
  return resto.toString();
}

function validarRut(rutNumero, rutDV) {
  if (!/^\d{7,8}$/.test(rutNumero)) {
    alert("Ingrese un RUT válido (solo números).");
    return false;
  }
  const dvCalculado = calcularDV(rutNumero);
  if (dvCalculado !== rutDV.toUpperCase()) {
    alert("RUT inválido. Verifica el número y el dígito verificador.");
    return false;
  }
  return true;
}

function guardarFicha() {
  const rutNumero = document.getElementById("rutNumero").value.trim();
  const rutDV = document.getElementById("rutDV").value.trim().toUpperCase();
  const nombres = document.getElementById("nombres").value.trim();
  const apellidoPaterno = document
    .getElementById("apellidoPaterno")
    .value.trim();
  const apellidoMaterno = document
    .getElementById("apellidoMaterno")
    .value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const nacimiento = document.getElementById("nacimiento").value;
  const estadoCivil = document.getElementById("estadoCivil").value;
  const comentarios = document.getElementById("comentarios").value.trim();
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;

  if (!nombres || !nombreRegex.test(nombres)) {
    alert("Ingrese un nombre válido (solo letras y espacios).");
    return;
  }

  if (!apellidoPaterno || !nombreRegex.test(apellidoPaterno)) {
    alert("Ingrese un apellido paterno válido (solo letras).");
    return;
  }
  if (!apellidoMaterno || !nombreRegex.test(apellidoMaterno)) {
    alert("Ingrese un apellido materno válido (solo letras).");
    return;
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Email inválido. Ingrese un correo electrónico válido.");
    return;
  }

  const hoy = new Date().toISOString().split("T")[0];
  if (!nacimiento || nacimiento > hoy) {
    alert("Fecha de nacimiento inválida. No puede ser en el futuro.");
    return;
  }

  if (!validarRut(rutNumero, rutDV)) {
    return;
  }

  if (!/^\d{7,15}$/.test(telefono)) {
    alert("Teléfono inválido. Solo números y entre 7 a 15 dígitos.");
    return;
  }

  const rutCompleto = `${rutNumero}-${rutDV}`;
  const ficha = {
    rut: rutCompleto,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    direccion,
    ciudad,
    telefono,
    email,
    nacimiento,
    estadoCivil,
    comentarios,
  };

  if (localStorage.getItem(rutCompleto)) {
    if (!confirm("¿Deseas sobrescribir este registro?")) return;
  }

  localStorage.setItem(rutCompleto, JSON.stringify(ficha));
  document.getElementById("fichaForm").reset();

  alert("Ficha guardada correctamente.");
  window.location.href = "agradecimiento.html";
}

function buscarPorApellido() {
  const apellidoBuscado = document
    .getElementById("buscarApellido")
    .value.trim()
    .toLowerCase();

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      try {
        const ficha = JSON.parse(localStorage.getItem(key));
        if (
          ficha.apellidoPaterno &&
          ficha.apellidoPaterno.toLowerCase() === apellidoBuscado
        ) {
          sessionStorage.setItem("pacienteBuscado", JSON.stringify(ficha));
          window.location.href = "datosBusqueda.html";
          return;
        }
      } catch (e) {
        console.error("Error al leer una ficha:", e);
      }
    }
  }

  alert("No se encontró ningún paciente con ese apellido paterno.");
}

// Función para rellenar campos automáticamente al cargar la página
function rellenarCampos() {
  // Simula datos para rellenar los campos
  const datos = {
    rutNumero: "12345678",
    rutDV: "K",
    nombres: "Juan Pedro",
    apellidoPaterno: "González",
    apellidoMaterno: "Rodríguez",
    direccion: "Calle Principal 123",
    ciudad: "Santiago",
    telefono: "123456789",
    email: "juan@example.com",
    nacimiento: "1990-01-01",
    estadoCivil: "Soltero",
    comentarios: "Sin comentarios",
  };

  document.getElementById("rutNumero").value = datos.rutNumero;
  document.getElementById("rutDV").value = datos.rutDV;
  document.getElementById("nombres").value = datos.nombres;
  document.getElementById("apellidoPaterno").value = datos.apellidoPaterno;
  document.getElementById("apellidoMaterno").value = datos.apellidoMaterno;
  document.getElementById("direccion").value = datos.direccion;
  document.getElementById("ciudad").value = datos.ciudad;
  document.getElementById("telefono").value = datos.telefono;
  document.getElementById("email").value = datos.email;
  document.getElementById("nacimiento").value = datos.nacimiento;
  document.getElementById("estadoCivil").value = datos.estadoCivil;
  document.getElementById("comentarios").value = datos.comentarios;
}

// Llama a la función para rellenar campos al cargar la página
document.addEventListener('DOMContentLoaded', rellenarCampos);

