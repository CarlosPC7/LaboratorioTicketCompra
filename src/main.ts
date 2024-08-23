import { TipoIva, LineaTicket, ResultadoLineaTicket, TicketFinal, TotalPorTipoIva } from "./modelo";

interface DesgloseIva {
  general: number;
  reducido: number;
  superreducidoA: number;
  superreducidoB: number;
  superreducidoC: number;
  sinIva: number;
}

export const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
  {
    producto: {
      nombre: "Galletas",
      precio: 3,
      tipoIva: "superreducidoB",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Pan",
      precio: 1.5,
      tipoIva: "superreducidoC",
    },
    cantidad: 4,
  }
];

// Función calcular Ticket

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  let totalSinIva = 0;
  let totalIva = 0;

  // Usar la estructura explícita
  const desgloseIva: DesgloseIva = {
    general: 0,
    reducido: 0,
    superreducidoA: 0,
    superreducidoB: 0,
    superreducidoC: 0,
    sinIva: 0,
  };

  const lineas = lineasTicket.map((linea) => {
    const { producto, cantidad } = linea;
    const { nombre, precio, tipoIva } = producto;

    const precioSinIva = precio * cantidad;
    let ivaPorcentaje = 0;

    switch (tipoIva) {
      case "general":
        ivaPorcentaje = 21;
        break;
      case "reducido":
        ivaPorcentaje = 10;
        break;
      case "superreducidoA":
        ivaPorcentaje = 5;
        break;
      case "superreducidoB":
        ivaPorcentaje = 4;
        break;
      case "superreducidoC":
      case "sinIva":
        ivaPorcentaje = 0;
        break;
    }

    const iva = (precioSinIva * ivaPorcentaje) / 100;
    const precioConIva = precioSinIva + iva;

    totalSinIva += precioSinIva;
    totalIva += iva;
    desgloseIva[tipoIva] += iva;

    return {
      nombre,
      cantidad,
      precionSinIva: precioSinIva,
      tipoIva,
      precioConIva,
    };
  });

  const totalConIva = totalSinIva + totalIva;

  const desgloseIvaArray: TotalPorTipoIva[] = Object.entries(desgloseIva).map(
    ([tipoIva, cuantia]) => ({
      tipoIva: tipoIva as TipoIva,
      cuantia,
    })
  );

  return {
    lineas,
    total: {
      totalSinIva,
      totalConIva,
      totalIva,
    },
    desgloseIva: desgloseIvaArray,
  };
};

// Función calcular Ticket con reduce

export const calculaTicketConReduce = (lineasTicket: LineaTicket[]): TicketFinal => {
  const { lineas, totalSinIva, totalIva, desgloseIva } = lineasTicket.reduce(
    (acc, linea) => {
      const { producto, cantidad } = linea;
      const { nombre, precio, tipoIva } = producto;

      const precioSinIva = precio * cantidad;
      let ivaPorcentaje = 0;

      switch (tipoIva) {
        case "general":
          ivaPorcentaje = 21;
          break;
        case "reducido":
          ivaPorcentaje = 10;
          break;
        case "superreducidoA":
          ivaPorcentaje = 5;
          break;
        case "superreducidoB":
          ivaPorcentaje = 4;
          break;
        case "superreducidoC":
        case "sinIva":
          ivaPorcentaje = 0;
          break;
      }

      const iva = (precioSinIva * ivaPorcentaje) / 100;
      const precioConIva = precioSinIva + iva;

      acc.totalSinIva += precioSinIva;
      acc.totalIva += iva;
      acc.desgloseIva[tipoIva] += iva;

      acc.lineas.push({
        nombre,
        cantidad,
        precionSinIva: precioSinIva,
        tipoIva,
        precioConIva,
      });

      return acc;
    },
    {
      lineas: [] as ResultadoLineaTicket[],
      totalSinIva: 0,
      totalIva: 0,
      // Usar la estructura explícita
      desgloseIva: {
        general: 0,
        reducido: 0,
        superreducidoA: 0,
        superreducidoB: 0,
        superreducidoC: 0,
        sinIva: 0,
      },
    }
  );

  const totalConIva = totalSinIva + totalIva;

  const desgloseIvaArray: TotalPorTipoIva[] = Object.entries(desgloseIva).map(
    ([tipoIva, cuantia]) => ({
      tipoIva: tipoIva as TipoIva,
      cuantia,
    })
  );

  return {
    lineas,
    total: {
      totalSinIva,
      totalConIva,
      totalIva,
    },
    desgloseIva: desgloseIvaArray,
  };
};