import { calculaTicket, calculaTicketConReduce } from './main';
import { LineaTicket, TicketFinal } from './modelo';

describe('calculaTicket', () => {

  it('debería devolver un total sin IVA de 47', () => {
    // Arrange
    const lineas: LineaTicket[] = [
      { producto: { nombre: 'Legumbres', precio: 2, tipoIva: 'general' }, cantidad: 2 },
      { producto: { nombre: 'Perfume', precio: 20, tipoIva: 'general' }, cantidad: 3 },
      { producto: { nombre: 'Leche', precio: 1, tipoIva: 'superreducidoC' }, cantidad: 6 },
      { producto: { nombre: 'Lasaña', precio: 5, tipoIva: 'superreducidoA' }, cantidad: 1 },
      { producto: { nombre: 'Galletas', precio: 3, tipoIva: 'superreducidoB' }, cantidad: 2 },
      { producto: { nombre: 'Pan', precio: 1.5, tipoIva: 'superreducidoC' }, cantidad: 4 }
    ];

    // Act
    const resultado: TicketFinal = calculaTicket(lineas);

    // Assert
    expect(resultado.total.totalSinIva).toBe(87);
  });

  it('debería devolver un total de IVA de 13.44', () => {
    // Arrange
    const lineas: LineaTicket[] = [
      { producto: { nombre: 'Legumbres', precio: 2, tipoIva: 'general' }, cantidad: 2 },
      { producto: { nombre: 'Perfume', precio: 20, tipoIva: 'general' }, cantidad: 3 },
      { producto: { nombre: 'Leche', precio: 1, tipoIva: 'superreducidoC' }, cantidad: 6 },
      { producto: { nombre: 'Lasaña', precio: 5, tipoIva: 'superreducidoA' }, cantidad: 1 },
      { producto: { nombre: 'Galletas', precio: 3, tipoIva: 'superreducidoB' }, cantidad: 2 },
      { producto: { nombre: 'Pan', precio: 1.5, tipoIva: 'superreducidoC' }, cantidad: 4 }
    ];

    // Act
    const resultado: TicketFinal = calculaTicket(lineas);

    // Assert
    expect(resultado.total.totalIva).toBe(13.93);
  });

  it('debería devolver un total con IVA de 60.44', () => {
    // Arrange
    const productos: LineaTicket[] = [
      { producto: { nombre: 'Legumbres', precio: 2, tipoIva: 'general' }, cantidad: 2 },
      { producto: { nombre: 'Perfume', precio: 20, tipoIva: 'general' }, cantidad: 3 },
      { producto: { nombre: 'Leche', precio: 1, tipoIva: 'superreducidoC' }, cantidad: 6 },
      { producto: { nombre: 'Lasaña', precio: 5, tipoIva: 'superreducidoA' }, cantidad: 1 },
      { producto: { nombre: 'Galletas', precio: 3, tipoIva: 'superreducidoB' }, cantidad: 2 },
      { producto: { nombre: 'Pan', precio: 1.5, tipoIva: 'superreducidoC' }, cantidad: 4 }
    ];

    // Act
    const resultado: TicketFinal = calculaTicket(productos);

    // Assert
    expect(resultado.total.totalConIva).toBe(100.93);
  });

});

describe('calculaTicketConReduce', () => {

  it('debería devolver un total sin IVA de 70', () => {
    // Arrange
    const productos: LineaTicket[] = [
      { producto: { nombre: 'Legumbres', precio: 2, tipoIva: 'general' }, cantidad: 2 },
      { producto: { nombre: 'Perfume', precio: 20, tipoIva: 'general' }, cantidad: 3 },
      { producto: { nombre: 'Leche', precio: 1, tipoIva: 'superreducidoC' }, cantidad: 6 },
      { producto: { nombre: 'Lasaña', precio: 5, tipoIva: 'superreducidoA' }, cantidad: 1 },
      { producto: { nombre: 'Galletas', precio: 3, tipoIva: 'superreducidoB' }, cantidad: 2 },
      { producto: { nombre: 'Pan', precio: 1.5, tipoIva: 'superreducidoC' }, cantidad: 4 }
    ];

    // Act
    const resultado: TicketFinal = calculaTicketConReduce(productos);

    // Assert
    expect(resultado.total.totalSinIva).toBe(87);
  });

  it('debería devolver un total de IVA de 13.44', () => {
    // Arrange
    const productos: LineaTicket[] = [
      { producto: { nombre: "Legumbres", precio: 2, tipoIva: "general" }, cantidad: 2 },
      { producto: { nombre: "Perfume", precio: 20, tipoIva: "general" }, cantidad: 3 },
      { producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" }, cantidad: 6 },
    ];

    // Act
    const resultado: TicketFinal = calculaTicketConReduce(productos);

    // Assert
    expect(resultado.total.totalIva).toBe(13.44);
  });

  it('debería devolver un total con IVA de 83.44', () => {
    // Arrange
    const productos: LineaTicket[] = [
      { producto: { nombre: "Legumbres", precio: 2, tipoIva: "general" }, cantidad: 2 },
      { producto: { nombre: "Perfume", precio: 20, tipoIva: "general" }, cantidad: 3 },
      { producto: { nombre: "Leche", precio: 1, tipoIva: "superreducidoC" }, cantidad: 6 },
    ];

    // Act
    const resultado: TicketFinal = calculaTicketConReduce(productos);

    // Assert
    expect(resultado.total.totalConIva).toBe(83.44);
  });

});