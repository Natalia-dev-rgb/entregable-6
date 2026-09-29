// ===== SIMULADOR DE KUNG FU =====

// 1) CLASE + ARRAY DE OBJETOS (nuestra "base de datos")
class Luchador {
  constructor(id, nombre, estilo, nivel, puntos) {
    this.id = id;
    this.nombre = nombre;
    this.estilo = estilo;
    this.nivel = nivel;
    this.puntos = puntos;
  }

  presentarse() {
    return `${this.nombre} (#${this.id}) - Estilo: ${this.estilo} | Nivel: ${this.nivel} | Puntos: ${this.puntos}`;
  }

  entrenar(horas) {
    this.puntos += horas * 10;
    this.nivel = Math.floor(this.puntos / 100) + 1;
  }
}

const luchadores = [
  new Luchador(1, "Li Wei", "Shaolin", 3, 250),
  new Luchador(2, "Mei Lin", "Wing Chun", 4, 340),
  new Luchador(3, "Chen Bo", "Tai Chi", 2, 180),
  new Luchador(4, "Zhao Yun", "Shaolin", 5, 480),
  new Luchador(5, "Xiao Long", "Wing Chun", 1, 90),
  new Luchador(6, "Ling Fei", "Tai Chi", 3, 290),
];

// 2) FUNCIONES DEL SIMULADOR (usan métodos de orden superior)

// BÚSQUEDA 1: find -> un luchador por id
const buscarPorId = (id) => luchadores.find((luchador) => luchador.id === id);

// BÚSQUEDA 2: filter -> luchadores de un estilo
const filtrarPorEstilo = (estilo) =>
  luchadores.filter((luchador) => luchador.estilo.toLowerCase() === estilo.toLowerCase());

// BÚSQUEDA 3: some -> ¿existe algún luchador con al menos cierto nivel?
const hayNivelMinimo = (nivel) => luchadores.some((luchador) => luchador.nivel >= nivel);

// TRANSFORMACIÓN 1: sort + slice + map -> ranking de los 3 mejores
const top3 = () =>
  [...luchadores]
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 3)
    .map((luchador) => `${luchador.nombre}: ${luchador.puntos} puntos`);

// TRANSFORMACIÓN 2: reduce -> total de puntos del dojo
const totalPuntos = () => luchadores.reduce((acumulado, luchador) => acumulado + luchador.puntos, 0);

// 3) INTERACCIÓN CON EL USUARIO (prompt + ciclo)
let opcion = "";

while (opcion !== "0") {
  opcion = prompt(
    "DOJO DE KUNG FU - Elegí una opción:\n" +
    "1 - Buscar luchador por ID\n" +
    "2 - Ver luchadores por estilo\n" +
    "3 - Ver ranking Top 3\n" +
    "4 - Ver puntos totales del dojo\n" +
    "5 - Entrenar a un luchador\n" +
    "6 - ¿Hay luchadores de nivel mínimo?\n" +
    "0 - Salir"
  );

  // Si el usuario aprieta "Cancelar", prompt devuelve null
  if (opcion === null) {
    opcion = "0";
  }

  switch (opcion) {
    case "1": {
      const id = parseInt(prompt("Ingresá el ID del luchador (1 a 6):"));
      const encontrado = buscarPorId(id);
      if (encontrado) {
        console.log("Luchador encontrado:", encontrado.presentarse());
      } else {
        console.log(`No existe un luchador con ID ${id}.`);
      }
      break;
    }
    case "2": {
      const estilo = prompt("Ingresá el estilo (Shaolin, Wing Chun o Tai Chi):");
      const lista = filtrarPorEstilo(estilo || "");
      if (lista.length > 0) {
        console.log(`Luchadores de ${estilo}:`);
        lista.forEach((luchador) => console.log(luchador.presentarse()));
      } else {
        console.log(`No hay luchadores del estilo "${estilo}".`);
      }
      break;
    }
    case "3":
      console.log("TOP 3 del dojo:");
      top3().forEach((linea, indice) => console.log(`${indice + 1}. ${linea}`));
      break;
    case "4":
      console.log(`Puntos totales del dojo: ${totalPuntos()}`);
      break;
    case "5": {
      const id = parseInt(prompt("ID del luchador a entrenar:"));
      const horas = parseInt(prompt("¿Cuántas horas entrena?"));
      const luchador = buscarPorId(id);
      if (luchador && horas > 0) {
        luchador.entrenar(horas);
        console.log(`¡Entrenamiento completado! ${luchador.presentarse()}`);
      } else {
        console.log("Datos inválidos: revisá el ID y las horas.");
      }
      break;
    }
    case "6": {
      const nivel = parseInt(prompt("Nivel mínimo a buscar:"));
      console.log(
        hayNivelMinimo(nivel)
          ? `Sí, hay luchadores de nivel ${nivel} o más.`
          : `No hay luchadores de nivel ${nivel} o más.`
      );
      break;
    }
    case "0":
      console.log("¡Hasta la próxima, maestra! Fin del simulador.");
      break;
    default:
      console.log("Opción no válida, probá de nuevo.");
  }
}
