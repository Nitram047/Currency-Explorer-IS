// ============================================================
// CURRENCY EXPLORER · STARTER PROJECT
// Archivo principal de trabajo para las misiones de JavaScript
// ============================================================

// 1. REFERENCIAS AL DOM
const cantidad = document.querySelector("#cantidad");
const origen = document.querySelector("#origen");
const destino = document.querySelector("#destino");
const btnConvertir = document.querySelector("#convertir");
const btnIntercambiar = document.querySelector("#intercambiar");
const resultado = document.querySelector("#resultado");
const resultadoTexto = document.querySelector("#resultadoTexto");
const detalleTasa = document.querySelector("#detalleTasa");

// 2. EVENTOS
btnConvertir.addEventListener("click", convertirMoneda);
btnIntercambiar.addEventListener("click", intercambiarMonedas);

// 3. FUNCIÓN PRINCIPAL
async function convertirMoneda() {
  const textoCantidad = cantidad.value.trim();
  if (textoCantidad === "") {
    mostrarError("Escribe una cantidad válida.");
    return;
  }

  const valor = Number(textoCantidad);
  if (!Number.isFinite(valor) || valor <= 0) {
    mostrarError("Escribe una cantidad mayor que cero.");
    return;
  }

  const monedaOrigen = origen.value;
  const monedaDestino = destino.value;

  if (monedaOrigen === monedaDestino) {
    mostrarResultado(
      `${formatear(valor)} ${monedaOrigen} = ${formatear(valor)} ${monedaDestino}`,
      "Ambas monedas son iguales; no hay conversión que realizar."
    );
    return;
  }

  const url = `https://api.frankfurter.dev/v2/rate/${monedaOrigen}/${monedaDestino}`;

  activarCarga(true);

  try {
    const respuesta = await fetch(url);

    // TODO · MISIÓN 09: comprobar response.ok y lanzar un error si corresponde.
    const datos = await respuesta.json();

    const conversion = valor * datos.rate;

    mostrarResultado(
      `${formatear(valor)} ${monedaOrigen} = ${formatear(conversion)} ${monedaDestino}`,
      `1 ${monedaOrigen} = ${datos.rate.toFixed(4)} ${monedaDestino} · Fecha: ${datos.date}`
    );
  } catch (error) {
    mostrarError("No fue posible completar la consulta.");
    console.error(error);
  } finally {
    activarCarga(false);
  }
}

function intercambiarMonedas() {
  const temporal = origen.value;
  origen.value = destino.value;
  destino.value = temporal;
  convertirMoneda();
}

// 4. UTILIDADES DE INTERFAZ
function mostrarError(mensaje) {
  resultado.classList.add("error");
  resultadoTexto.textContent = mensaje;
  detalleTasa.textContent = "Revisa los datos e inténtalo nuevamente.";
}

function mostrarResultado(textoPrincipal, detalle) {
  resultado.classList.remove("error");
  resultadoTexto.textContent = textoPrincipal;
  detalleTasa.textContent = detalle;
}

function formatear(numero) {
  return numero.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function activarCarga(cargando) {
  btnConvertir.disabled = cargando;
  btnIntercambiar.disabled = cargando;
  origen.disabled = cargando;
  destino.disabled = cargando;
  btnConvertir.textContent = cargando ? "Consultando..." : "Convertir";
  resultado.setAttribute("aria-busy", String(cargando));
}

// PISTA PARA EL RETO:
// origen.value        -> moneda seleccionada como origen
// destino.value       -> moneda seleccionada como destino
// cantidad.value      -> texto escrito en el input
// Number(...)         -> convierte texto a número
// response.ok         -> indica si la respuesta HTTP fue satisfactoria
// resultado.textContent -> permite modificar texto del DOM
