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
  return dvCalculado === rutDV.toUpperCase();
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

  if (!rutNumero) {
    alert("Complete el campo de RUT número (solo números).");
    return;
  }

  if (!rutDV) {
    alert("Complete el campo de RUT dígito verificador.");
    return;
  }

  if (!validarRut(rutNumero, rutDV)) {
    alert("RUT inválido. Verifica el número y el dígito verificador.");
    return;
  }

  if (!nombres) {
    alert("Complete el campo de nombres.");
    return;
  } else if (!nombreRegex.test(nombres)) {
    alert("Ingrese un nombre válido (solo letras y espacios).");
    return;
  }

  if (!apellidoPaterno) {
    alert("Complete el campo de apellido paterno.");
    return;
  } else if (!nombreRegex.test(apellidoPaterno)) {
    alert("Ingrese un apellido paterno válido (solo letras).");
    return;
  }

  if (!apellidoMaterno) {
    alert("Complete el campo de apellido materno.");
    return;
  } else if (!nombreRegex.test(apellidoMaterno)) {
    alert("Ingrese un apellido materno válido (solo letras).");
    return;
  }

  if (!direccion) {
    alert("Complete el campo de dirección.");
    return;
  }

  if (!ciudad) {
    alert("Complete el campo de ciudad.");
    return;
  }

  if (!telefono) {
    alert("Complete el campo de teléfono.");
    return;
  } else if (!/^\d{7,15}$/.test(telefono)) {
    alert("Teléfono inválido. Solo números y entre 7 a 15 dígitos.");
    return;
  }

  if (!email) {
    alert("Complete el campo de email.");
    return;
  } else {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Email inválido. Ingrese un correo electrónico válido.");
      return;
    }
  }

  if (!nacimiento) {
    alert("Complete el campo de fecha de nacimiento.");
    return;
  } else {
    const hoy = new Date().toISOString().split("T")[0];
    if (nacimiento > hoy) {
      alert("Fecha de nacimiento inválida. No puede ser en el futuro.");
      return;
    }
  }

  if (!estadoCivil) {
    alert("Complete el campo de estado civil.");
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

}

