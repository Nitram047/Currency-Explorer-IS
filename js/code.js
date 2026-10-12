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
  // Misiones guiadas 1-3: ya existe un flujo mínimo funcional EUR -> USD.
  // A partir de la Misión 4 debes convertirlo en una solución dinámica.
  const textoCantidad=cantidad.value.trim();
  if(textoCantidad===""){
    mostrarError("EScribe una cantidad valida");
    return;
  }

  const valor = Number(cantidad.value);

  // TODO · MISIÓN 07: sustituir esta validación mínima por una validación completa.
  if (!Number.isFinite(valor) || valor <= 0) {
    mostrarError("Escribe una cantidad mayor que cero.");
    return;
  }

  // TODO · MISIÓN 04: reemplazar EUR y USD por los valores elegidos en los <select>.
  const monedaOrigen = origen.value;
  const monedaDestino = destino.value;

  if(monedaDestino === monedaDestino){
    mostrarResultado(
      `${formatear(valor)} ${monedaOrigen} = ${formatear(valor)} ${monedaDestino}`,
      "Ambas monedas son iguales; no hay conversión que realizar."
    );
    return;
  }

  const url = `https://api.frankfurter.dev/v2/rate/${monedaOrigen}/${monedaDestino}`;

  try {
    // TODO · MISIÓN 08: activar un estado visual de carga antes de consultar.
    const respuesta = await fetch(url);

    // TODO · MISIÓN 09: comprobar response.ok y lanzar un error si corresponde.
    const datos = await respuesta.json();

    //Mision 05
    const conversion=valor*datos.rate;
    
    mostrarResultado(
      `${formatear(valor)} ${monedaOrigen}=${formatear(conversion)}
      ${monedaDestino}`,
      `1 ${monedaOrigen} = ${datos.rate.toFixed(4)} ${monedaDestino} · 
      Fecha: ${datos.date}`
    );

      //Esto lo podemos remover
    resultado.classList.remove("error");
    resultadoTexto.textContent = `${valor.toFixed(2)} ${monedaOrigen} = ${conversion.toFixed(2)} ${monedaDestino}`;
    detalleTasa.textContent = `1 ${monedaOrigen} = ${datos.rate} ${monedaDestino} · ${datos.date}`;

  } catch (error) {
    // TODO · MISIÓN 09: mejora el mensaje y analiza qué errores pueden llegar aquí.
    mostrarError("No fue posible completar la consulta.");
    console.error(error);
  }
}



function intercambiarMonedas() {
  // TODO · MISIÓN 06:
  const temporal=origen.value;
  origen.value=destino.value;
  destino.value=temporal.value;
  convertirMoneda();
  mostrarError("Misión 06 pendiente: implementa el intercambio de monedas.");
}

// 4. UTILIDADES DE INTERFAZ
function mostrarError(mensaje) {
  resultado.classList.add("error");
  resultadoTexto.textContent = mensaje;
  detalleTasa.textContent = "Revisa los datos e inténtalo nuevamente.";
}

// Muestra un resultado correcto
function mostrarResultado(textoPrincipal, detalle) {
  resultado.classList.remove("error");
  resultadoTexto.textContent = textoPrincipal;
  detalleTasa.textContent = detalle;
}
//Nos formatea el numero con separadores y dos decimales
function formatear(numero) {
  return numero.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// PISTA PARA EL RETO:
// origen.value        -> moneda seleccionada como origen
// destino.value       -> moneda seleccionada como destino
// cantidad.value      -> texto escrito en el input
// Number(...)         -> convierte texto a número
// response.ok         -> indica si la respuesta HTTP fue satisfactoria
// resultado.textContent -> permite modificar texto del DOM
