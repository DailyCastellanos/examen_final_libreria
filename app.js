// examen-final-libreria - Sistema interactivo de gestión de libros

const readlineSync = require('readline-sync');
const fs = require('fs');

let catalogo = [];

function mostrarMenu() {
  console.log('\n--- El Rincón del Saber ---');
  console.log('1. Agregar libro');
  console.log('2. Mostrar catálogo');
  console.log('3. Buscar libro por título');
  console.log('4. Eliminar libro');
  console.log('5. Ver estadísticas');
  console.log('6. Ordenar libros');
  console.log('7. Editar libro');
  console.log('8. Salir');
}

function agregarLibro() {
  const titulo = readlineSync.question('Título: ');
  const autor = readlineSync.question('Autor: ');
  let precio = parseFloat(readlineSync.question('Precio: '));
  while (isNaN(precio) || precio <= 0) {
    precio = parseFloat(readlineSync.question('Ingrese un precio válido (> 0): '));
  }
  const anio = parseInt(readlineSync.question('Año de publicación: '));

  catalogo.push({ titulo, autor, precio, anio });
  console.log('Libro agregado correctamente.');
}

function mostrarCatalogo() {
  if (catalogo.length === 0) return console.log('No hay libros en el catálogo.');
  console.log('\nCatálogo de libros:');
  catalogo.forEach((libro, i) => {
    console.log(`${i + 1}. ${libro.titulo} - ${libro.autor} - Q${libro.precio} - Año: ${libro.anio}`);
  });
}

function buscarLibro() {
  const titulo = readlineSync.question('Ingrese el título del libro: ');
  const libro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (libro) {
    console.log(`\nTítulo: ${libro.titulo}\nAutor: ${libro.autor}\nPrecio: Q${libro.precio}\nAño: ${libro.anio}`);
  } else {
    console.log('Libro no encontrado.');
  }
}

function eliminarLibro() {
  const titulo = readlineSync.question('Ingrese el título del libro a eliminar: ');
  const index = catalogo.findIndex(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (index !== -1) {
    catalogo.splice(index, 1);
    console.log('Libro eliminado correctamente.');
  } else {
    console.log('Libro no encontrado.');
  }
}

function verEstadisticas() {
  if (catalogo.length === 0) return console.log('No hay libros para analizar.');

  const total = catalogo.length;
  const promedio = catalogo.reduce((sum, l) => sum + l.precio, 0) / total;
  const masAntiguo = catalogo.reduce((a, b) => (a.anio < b.anio ? a : b));
  const masCaro = catalogo.reduce((a, b) => (a.precio > b.precio ? a : b));

  console.log(`\nTotal de libros: ${total}`);
  console.log(`Precio promedio: Q${promedio.toFixed(2)}`);
  console.log(`Libro más antiguo: ${masAntiguo.titulo} (${masAntiguo.anio})`);
  console.log(`Libro más caro: ${masCaro.titulo} (Q${masCaro.precio})`);
}

function ordenarLibros() {
  console.log('1. Por precio (ascendente)');
  console.log('2. Por precio (descendente)');
  console.log('3. Por año de publicación');
  const opcion = readlineSync.questionInt('Seleccione una opción: ');

  let ordenado;
  switch (opcion) {
    case 1:
      ordenado = [...catalogo].sort((a, b) => a.precio - b.precio);
      break;
    case 2:
      ordenado = [...catalogo].sort((a, b) => b.precio - a.precio);
      break;
    case 3:
      ordenado = [...catalogo].sort((a, b) => a.anio - b.anio);
      break;
    default:
      console.log('Opción no válida.');
      return;
  }

  ordenado.forEach((libro, i) => {
    console.log(`${i + 1}. ${libro.titulo} - ${libro.autor} - Q${libro.precio} - Año: ${libro.anio}`);
  });
}

function editarLibro() {
  const titulo = readlineSync.question('Ingrese el título del libro a editar: ');
  const libro = catalogo.find(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (!libro) return console.log('Libro no encontrado.');

  console.log('Deje en blanco si no desea cambiar un dato.');
  const nuevoTitulo = readlineSync.question(`Nuevo título (${libro.titulo}): `) || libro.titulo;
  const nuevoAutor = readlineSync.question(`Nuevo autor (${libro.autor}): `) || libro.autor;
  let nuevoPrecio = readlineSync.question(`Nuevo precio (Q${libro.precio}): `);
  nuevoPrecio = nuevoPrecio ? parseFloat(nuevoPrecio) : libro.precio;
  let nuevoAnio = readlineSync.question(`Nuevo año (${libro.anio}): `);
  nuevoAnio = nuevoAnio ? parseInt(nuevoAnio) : libro.anio;

  libro.titulo = nuevoTitulo;
  libro.autor = nuevoAutor;
  libro.precio = nuevoPrecio;
  libro.anio = nuevoAnio;

  console.log('Libro editado correctamente.');
}

function guardarCatalogo() {
  fs.writeFileSync('catalogo.json', JSON.stringify(catalogo, null, 2));
  console.log('Catálogo guardado en catalogo.json');
}

// Programa principal
let opcion;
do {
  mostrarMenu();
  opcion = readlineSync.questionInt('Seleccione una opción: ');
  switch (opcion) {
    case 1:
      agregarLibro();
      break;
    case 2:
      mostrarCatalogo();
      break;
    case 3:
      buscarLibro();
      break;
    case 4:
      eliminarLibro();
      break;
    case 5:
      verEstadisticas();
      break;
    case 6:
      ordenarLibros();
      break;
    case 7:
      editarLibro();
      break;
    case 8:
      guardarCatalogo();
      console.log('Saliendo del sistema...');
      break;
    default:
      console.log('Opción no válida.');
  }
} while (opcion !== 8);
