# Currency-Explorer-IS

Construir, en parejas, una aplicación web que convierta importes entre divisas utilizando información real.

# Currency Explorer · Starter Project

## Integrantes

- Hernandez Naranjillo Owen Alberto
- Arriaga Alejos Juan Martin

## Pair Programming

| Misión | Driver | Navigator | Commit / evidencia |
| ------ | ------ | --------- | ------------------ |
| 04     | Owen   | Martin | 9af396e |
| 05     | Martin | Owen   | a2d6276 |
| 06     | Owen   | Martin | f6d1c0b |
| 07     | Martin | Owen   | 3200848 |
| 08     | Martin | Owen   | 5d82036 |
| 09     | Owen   | Martin | 7667862 |
| 10     | Ambos  | Ambos  | Commit de este README |

## Objetivo

Completar una aplicación frontend que consuma Frankfurter API para convertir divisas y demostrar comprensión de eventos, DOM, `fetch()`, JSON, asincronía, validación y manejo de errores.

## Ejecución

1. Descomprime el proyecto.
1. Abre la carpeta en VS Code.
1. Ejecuta `index.html` con Live Server o un servidor local equivalente.
1. Abre DevTools → Console y Network para observar el comportamiento.

## API

Endpoint de referencia: `https://api.frankfurter.dev/v2/rate/{origen}/{destino}`

## Decisiones técnicas

Registra aquí al menos dos decisiones tomadas por la pareja y explica por qué.

1. **Armar la consulta con lo que elige el usuario.** En lugar de dejar fijas las monedas EUR y USD, tomamos el valor de los desplegables de origen y destino para pedir el tipo de cambio. Así cualquier combinación funciona sin tocar el código.
2. **Un solo lugar para el estado de carga y un `finally` que lo cierra.** La función `activarCarga` bloquea los controles mientras se consulta la API, y la llamamos con `false` dentro de un bloque `finally`. De este modo el formulario vuelve a quedar disponible siempre, aunque la consulta falle.
3. **Revisar la respuesta antes de usarla.** Añadimos la comprobación `response.ok` y separamos los errores de conexión de los del servidor, para mostrar un mensaje que se entienda en cada caso.

## Revisión cruzada

- Aspecto bien resuelto: dividimos el código en funciones pequeñas y claras (mostrar el resultado, dar formato a los números, activar la carga), así cada quien podía trabajar en una parte sin pisar al otro. Además los importes se ven con dos decimales en formato de México.
- Error o comportamiento mejorable: al probar nos dimos cuenta de que la app no convertía nada, siempre decía que las dos monedas eran iguales. También el botón de intercambiar dejaba vacío el campo de destino, y después de convertir una vez los controles se quedaban bloqueados.
- Propuesta de mejora: comparar bien la moneda de origen con la de destino, arreglar el intercambio para que no se pierda la moneda y volver a habilitar los controles al terminar, incluso si algo sale mal.
- Cambio incorporado después de la revisión: hicimos todos esos ajustes y quedaron en un mismo commit (`f6d1c0b`).

## Reflexión final (150–200 palabras)

Este proyecto nos enseñó a trabajar en equipo con Git: cada quien hacía su parte en su rama, la subía y luego revisábamos juntos el código del otro antes de unirlo. Lo que más aprendimos fue a seguirle la pista a una conversión de principio a fin: tomar lo que el usuario escribe y elige, pedirlo a la API de Frankfurter, esperar la respuesta y mostrarla en pantalla.

Una dificultad que nos costó fue el estado de carga: habíamos deshabilitado los controles mientras se consultaba la API, pero nunca los volvíamos a habilitar, así que después de la primera consulta ya no se podía hacer nada más. Lo resolvimos con un bloque `finally` que siempre deja todo listo otra vez.

Otra cosa que se nos pasó fue una comparación mal escrita que hacía que la app creyera que las dos monedas eran iguales aunque eligieras distintas, y por eso no convertía nada. Lo notamos hasta que lo probamos en el navegador.

Al final, lo más valioso fue revisar el trabajo del compañero: escuchar la explicación del otro y cuestionarnos entre los dos nos ayudó a encontrar errores que solos no veíamos.
