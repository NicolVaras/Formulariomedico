// Función para calcular el DV
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

// Función para validar el RUT con su DV
function validarRut(rutNumero, rutDV) {
  if (!/^\d{7,8}$/.test(rutNumero)) return false;
  const dvCalculado = calcularDV(rutNumero);
  return dvCalculado === rutDV.toUpperCase();
}

// Función para guardar la ficha
function guardarFicha() {
  const rutNumero = document.getElementById("rutNumero").value.trim();
  const rutDV = document.getElementById("rutDV").value.trim().toUpperCase();
  const nombres = document.getElementById("nombres").value.trim();
  const apellidoPaterno = document.getElementById("apellidoPaterno").value.trim();
  const apellidoMaterno = document.getElementById("apellidoMaterno").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const nacimiento = document.getElementById("nacimiento").value;
  const estadoCivil = document.getElementById("estadoCivil").value;
  const comentarios = document.getElementById("comentarios").value.trim();

  // Regex para validar solo letras en nombres y apellidos
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;

  // Validaciones
  if (!rutNumero || !/^\d+$/.test(rutNumero)) {
    alert("Ingrese un RUT válido.");
    return;
  }

  if (!validarRut(rutNumero, rutDV)) {
    alert("RUT inválido. Verifica el número y el dígito verificador.");
    return;
  }

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

  if (!/^\d{7,15}$/.test(telefono)) {
    alert("Teléfono inválido. Solo números y entre 7 a 15 dígitos.");
    return;
  }

  // Verificación de campos vacíos
  const campos = [rutNumero, rutDV, nombres, apellidoPaterno, apellidoMaterno, direccion, ciudad, telefono, email, nacimiento, estadoCivil];
  const camposNombres = ["RUT", "Nombre", "Apellido Paterno", "Apellido Materno", "Dirección", "Ciudad", "Teléfono", "Email", "Fecha de Nacimiento", "Estado Civil"];

  for (let i = 0; i < campos.length; i++) {
    if (!campos[i]) {
      alert(`Por favor, rellene el campo de ${camposNombres[i]}.`);
      return;
    }
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

// Función para buscar por RUT
function buscarPorRut() {
  const rutBuscado = document.getElementById("buscarRut").value.trim().toUpperCase();
  
  // Verifica si hay un RUT ingresado
  if (!rutBuscado) {
    alert("Por favor ingrese un RUT para buscar.");
    return;
  }

  const fichaGuardada = localStorage.getItem(rutBuscado);
  if (fichaGuardada) {
    const ficha = JSON.parse(fichaGuardada);
    sessionStorage.setItem("pacienteBuscado", JSON.stringify(ficha));
    window.location.href = "datosBusqueda.html";
  } else {
    alert("No se encontró un paciente con ese RUT.");
  }
}

// Configuración del campo de fecha para no permitir fechas futuras y hasta el año 2028
const maxFecha = new Date(2028, 11, 31); // El último día de diciembre de 2028
document.getElementById("nacimiento").setAttribute("max", maxFecha.toISOString().split("T")[0]);

