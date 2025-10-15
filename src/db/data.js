/**
 * Base de datos de ejemplo para ejercicios de JavaScript
 * Este archivo contiene diferentes conjuntos de datos que se utilizarán
 * en los ejercicios propuestos en ejercicios.md
 */

// Array de objetos: Usuarios
export const usuarios = [
  {
    id: 1,
    nombre: "Ana",
    apellidos: "García López",
    email: "ana.garcia@example.com",
    telefono: "600123456",
    edad: 28,
    ciudad: "Madrid",
    pais: "España",
    hobbies: ["lectura", "senderismo", "fotografía"],
    activo: true,
    fechaRegistro: new Date("2022-01-15"),
    avatar: "https://picsum.photos/seed/user1/200/200.jpg",
    nivel: "premium",
    puntos: 1250
  },
  {
    id: 2,
    nombre: "Juan",
    apellidos: "Martínez Pérez",
    email: "juan.martinez@example.com",
    telefono: "600234567",
    edad: 34,
    ciudad: "Barcelona",
    pais: "España",
    hobbies: ["videojuegos", "cocina", "cine"],
    activo: true,
    fechaRegistro: new Date("2022-03-22"),
    avatar: "https://picsum.photos/seed/user2/200/200.jpg",
    nivel: "estándar",
    puntos: 750
  },
  {
    id: 3,
    nombre: "María",
    apellidos: "López Gómez",
    email: "maria.lopez@example.com",
    telefono: "600345678",
    edad: 25,
    ciudad: "Valencia",
    pais: "España",
    hobbies: ["pintura", "música", "baile"],
    activo: false,
    fechaRegistro: new Date("2022-05-10"),
    avatar: "https://picsum.photos/seed/user3/200/200.jpg",
    nivel: "básico",
    puntos: 320
  },
  {
    id: 4,
    nombre: "Carlos",
    apellidos: "Rodríguez Sánchez",
    email: "carlos.rodriguez@example.com",
    telefono: "600456789",
    edad: 42,
    ciudad: "Sevilla",
    pais: "España",
    hobbies: ["fútbol", "pesca", "jardinería"],
    activo: true,
    fechaRegistro: new Date("2022-07-08"),
    avatar: "https://picsum.photos/seed/user4/200/200.jpg",
    nivel: "premium",
    puntos: 2100
  },
  {
    id: 5,
    nombre: "Laura",
    apellidos: "Sánchez Díaz",
    email: "laura.sanchez@example.com",
    telefono: "600567890",
    edad: 31,
    ciudad: "Bilbao",
    pais: "España",
    hobbies: ["yoga", "viajes", "gastronomía"],
    activo: true,
    fechaRegistro: new Date("2022-09-14"),
    avatar: "https://picsum.photos/seed/user5/200/200.jpg",
    nivel: "estándar",
    puntos: 890
  },
  {
    id: 6,
    nombre: "Miguel",
    apellidos: "Fernández Jiménez",
    email: "miguel.fernandez@example.com",
    telefono: "600678901",
    edad: 29,
    ciudad: "Málaga",
    pais: "España",
    hobbies: ["surf", "fotografía", "tecnología"],
    activo: true,
    fechaRegistro: new Date("2022-11-20"),
    avatar: "https://picsum.photos/seed/user6/200/200.jpg",
    nivel: "estándar",
    puntos: 650
  },
  {
    id: 7,
    nombre: "Carmen",
    apellidos: "Ruiz Moreno",
    email: "carmen.ruiz@example.com",
    telefono: "600789012",
    edad: 36,
    ciudad: "Zaragoza",
    pais: "España",
    hobbies: ["lectura", "teatro", "viajes"],
    activo: false,
    fechaRegistro: new Date("2023-01-05"),
    avatar: "https://picsum.photos/seed/user7/200/200.jpg",
    nivel: "básico",
    puntos: 180
  },
  {
    id: 8,
    nombre: "David",
    apellidos: "Hernández Castro",
    email: "david.hernandez@example.com",
    telefono: "600890123",
    edad: 45,
    ciudad: "A Coruña",
    pais: "España",
    hobbies: ["ciclismo", "montaña", "fotografía"],
    activo: true,
    fechaRegistro: new Date("2023-02-12"),
    avatar: "https://picsum.photos/seed/user8/200/200.jpg",
    nivel: "premium",
    puntos: 3200
  }
];

// Array de objetos: Productos
export const productos = [
  {
    id: 101,
    nombre: "Laptop Pro 15\"",
    descripcion: "Portátil de alta gama con procesador Intel i7, 16GB RAM y SSD de 512GB",
    categoría: "Electrónica",
    precio: 1299.99,
    precioAnterior: 1499.99,
    stock: 15,
    valoracion: 4.5,
    numValoraciones: 127,
    etiquetas: ["computación", "portátil", "trabajo"],
    imagen: "https://picsum.photos/seed/laptop/300/200.jpg",
    destacado: true,
    fechaLanzamiento: new Date("2023-01-15"),
    descuento: 15
  },
  {
    id: 102,
    nombre: "Auriculares Bluetooth X5",
    descripción: "Auriculares inalámbricos con cancelación de ruido y 30h de autonomía",
    categoría: "Electrónica",
    precio: 79.99,
    precioAnterior: 99.99,
    stock: 50,
    valoracion: 4.2,
    numValoraciones: 89,
    etiquetas: ["audio", "inalámbrico", "música"],
    imagen: "https://picsum.photos/seed/headphones/300/200.jpg",
    destacado: false,
    fechaLanzamiento: new Date("2023-03-10"),
    descuento: 20
  },
  {
    id: 103,
    nombre: "Mesa de escritorio Oak",
    descripción: "Mesa de madera de roble con espacio para cableado integrado",
    categoría: "Muebles",
    precio: 189.99,
    precioAnterior: null,
    stock: 8,
    valoracion: 4.7,
    numValoraciones: 45,
    etiquetas: ["oficina", "madera", "trabajo"],
    imagen: "https://picsum.photos/seed/desk/300/200.jpg",
    destacado: false,
    fechaLanzamiento: new Date("2022-11-20"),
    descuento: 0
  },
  {
    id: 104,
    nombre: "Silla ergonómica Comfort",
    descripción: "Silla de oficina con soporte lumbar y reposabrazos ajustables",
    categoría: "Muebles",
    precio: 249.99,
    precioAnterior: 299.99,
    stock: 12,
    valoracion: 4.6,
    numValoraciones: 78,
    etiquetas: ["oficina", "confort", "salud"],
    imagen: "https://picsum.photos/seed/chair/300/200.jpg",
    destacado: true,
    fechaLanzamiento: new Date("2023-02-05"),
    descuento: 17
  },
  {
    id: 105,
    nombre: "Monitor 27\" 4K",
    descripción: "Monitor IPS 4K con 144Hz y compatibilidad HDR",
    categoría: "Electrónica",
    precio: 329.99,
    precioAnterior: 399.99,
    stock: 20,
    valoracion: 4.8,
    numValoraciones: 156,
    etiquetas: ["pantalla", "computación", "gaming"],
    imagen: "https://picsum.photos/seed/monitor/300/200.jpg",
    destacado: true,
    fechaLanzamiento: new Date("2023-04-12"),
    descuento: 18
  },
  {
    id: 106,
    nombre: "Teclado mecánico RGB",
    descripción: "Teclado mecánico con iluminación RGB personalizable y switches azules",
    categoría: "Electrónica",
    precio: 89.99,
    precioAnterior: null,
    stock: 35,
    valoracion: 4.4,
    numValoraciones: 92,
    etiquetas: ["teclado", "gaming", "rgb"],
    imagen: "https://picsum.photos/seed/keyboard/300/200.jpg",
    destacado: false,
    fechaLanzamiento: new Date("2023-05-20"),
    descuento: 0
  },
  {
    id: 107,
    nombre: "Ratón gaming inalámbrico",
    descripción: "Ratón gaming con sensor de 16000 DPI y 70h de batería",
    categoría: "Electrónica",
    precio: 59.99,
    precioAnterior: 79.99,
    stock: 25,
    valoracion: 4.3,
    numValoraciones: 67,
    etiquetas: ["ratón", "gaming", "inalámbrico"],
    imagen: "https://picsum.photos/seed/mouse/300/200.jpg",
    destacado: false,
    fechaLanzamiento: new Date("2023-06-01"),
    descuento: 25
  },
  {
    id: 108,
    nombre: "Lámpara LED inteligente",
    descripción: "Lámpara con control por app y más de 16 millones de colores",
    categoría: "Hogar",
    precio: 39.99,
    precioAnterior: null,
    stock: 45,
    valoracion: 4.1,
    numValoraciones: 34,
    etiquetas: ["iluminación", "inteligente", "hogar"],
    imagen: "https://picsum.photos/seed/lamp/300/200.jpg",
    destacado: false,
    fechaLanzamiento: new Date("2023-07-15"),
    descuento: 0
  }
];

// Array de objetos: Pedidos
export const pedidos = [
  {
    id: 1001,
    idUsuario: 1,
    productos: [
      { idProducto: 101, cantidad: 1, precioUnitario: 1299.99 },
      { idProducto: 102, cantidad: 2, precioUnitario: 79.99 }
    ],
    fecha: new Date("2023-01-20"),
    estado: "entregado",
    direccionEnvio: "Calle Mayor 123, Madrid",
    metodoPago: "tarjeta",
    costeEnvio: 0,
    numeroSeguimiento: "ES1234567890"
  },
  {
    id: 1002,
    idUsuario: 2,
    productos: [
      { idProducto: 103, cantidad: 1, precioUnitario: 189.99 },
      { idProducto: 104, cantidad: 1, precioUnitario: 249.99 }
    ],
    fecha: new Date("2023-02-15"),
    estado: "pendiente",
    direccionEnvio: "Avenida Diagonal 456, Barcelona",
    metodoPago: "paypal",
    costeEnvio: 9.99,
    numeroSeguimiento: null
  },
  {
    id: 1003,
    idUsuario: 4,
    productos: [
      { idProducto: 105, cantidad: 2, precioUnitario: 329.99 }
    ],
    fecha: new Date("2023-03-10"),
    estado: "enviado",
    direccionEnvio: "Plaza de España 789, Sevilla",
    metodoPago: "transferencia",
    costeEnvio: 0,
    numeroSeguimiento: "ES0987654321"
  },
  {
    id: 1004,
    idUsuario: 5,
    productos: [
      { idProducto: 106, cantidad: 1, precioUnitario: 89.99 },
      { idProducto: 107, cantidad: 1, precioUnitario: 59.99 },
      { idProducto: 108, cantidad: 3, precioUnitario: 39.99 }
    ],
    fecha: new Date("2023-04-05"),
    estado: "procesando",
    direccionEnvio: "Gran Vía 321, Bilbao",
    metodoPago: "tarjeta",
    costeEnvio: 4.99,
    numeroSeguimiento: null
  },
  {
    id: 1005,
    idUsuario: 8,
    productos: [
      { idProducto: 101, cantidad: 1, precioUnitario: 1299.99 },
      { idProducto: 105, cantidad: 1, precioUnitario: 329.99 }
    ],
    fecha: new Date("2023-05-12"),
    estado: "cancelado",
    direccionEnvio: "Rúa Real 456, A Coruña",
    metodoPago: "tarjeta",
    costeEnvio: 0,
    numeroSeguimiento: null
  }
];

// Array simple: Categorías
export const categorias = [
  "Electrónica",
  "Muebles",
  "Ropa",
  "Alimentación",
  "Deportes",
  "Libros",
  "Hogar",
  "Juguetes",
  "Salud y Belleza",
  "Automoción"
];

// Array de números para ejercicios
export const numeros = [5, 12, 8, 130, 44, 23, 67, 2, 99, 34, 56, 78, 90, 11, 33];

// Array de strings para ejercicios
export const palabras = [
  "javascript",
  "programación",
  "array",
  "función",
  "objeto",
  "variable",
  "bucle",
  "condicional",
  "método",
  "propiedad"
];

// Datos para ejercicios de Map y Set
export const ciudadesPoblacion = new Map([
  ["Madrid", 3200000],
  ["Barcelona", 1600000],
  ["Valencia", 800000],
  ["Sevilla", 700000],
  ["Bilbao", 350000],
  ["Málaga", 570000],
  ["Zaragoza", 680000],
  ["A Coruña", 245000]
]);

export const coloresPrimarios = new Set(["rojo", "azul", "amarillo"]);
export const coloresSecundarios = new Set(["verde", "naranja", "violeta"]);

// Estados posibles para los pedidos
export const estadosPedido = [
  "pendiente",
  "procesando",
  "enviado",
  "entregado",
  "cancelado"
];

// Métodos de pago disponibles
export const metodosPago = [
  { id: "tarjeta", nombre: "Tarjeta de crédito/débito", comision: 0 },
  { id: "paypal", nombre: "PayPal", comision: 0.02 },
  { id: "transferencia", nombre: "Transferencia bancaria", comision: 0 },
  { id: "contrareembolso", nombre: "Contra reembolso", comision: 0.03 }
];

// Niveles de usuario
export const nivelesUsuario = [
  { id: "básico", nombre: "Básico", beneficios: ["Soporte por email"], minPuntos: 0 },
  { id: "estándar", nombre: "Estándar", beneficios: ["Soporte prioritario", "Descuentos exclusivos"], minPuntos: 500 },
  { id: "premium", nombre: "Premium", beneficios: ["Soporte 24/7", "Envío gratis", "Descuentos exclusivos", "Acceso anticipado"], minPuntos: 1000 }
];