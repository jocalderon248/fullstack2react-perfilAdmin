const boletas = [
  {
    id: 1,
    fecha: "2025-10-25T12:00:00",
    cliente: {
      nombre: "María",
      apellido: "Pérez",
      correo: "maria@duocuc.cl",
      direccion: {
        calle: "Av. Siempre Viva 123",
        departamento: "Depto 5A",
        region: "Metropolitana",
        comuna: "Santiago",
        indicaciones: "Dejar en conserjería"
      }
    },
    productos: [
      { id: 0, titulo: "Persona 3: Reload", precio: 18500, cantidad: 1 },
      { id: 2, titulo: "SilkSong", precio: 10500, cantidad: 2 }
    ],
    total: 39500
  },
  {
    id: 2,
    fecha: "2025-10-24T17:30:00",
    cliente: {
      nombre: "Juan",
      apellido: "González",
      correo: "juan@example.com",
      direccion: {
        calle: "Calle Falsa 456",
        departamento: "Depto 2B",
        region: "Valparaíso",
        comuna: "Viña del Mar",
        indicaciones: ""
      }
    },
    productos: [
      { id: 1, titulo: "God of War: Ragnarok", precio: 25500, cantidad: 1 },
      { id: 4, titulo: "Elden Ring", precio: 30000, cantidad: 1 }
    ],
    total: 55500
  }
];

// Función para obtener boletas
export const getBoletas = () => {
  try {
    const raw = localStorage.getItem("boletas");
    return raw ? JSON.parse(raw) : boletas; // devuelve las de localStorage si existen
  } catch {
    return boletas;
  }
};

// Función para guardar una nueva boleta
export const saveBoleta = (nuevaBoleta) => {
  const actuales = getBoletas();
  const nuevaLista = [nuevaBoleta, ...actuales];
  localStorage.setItem("boletas", JSON.stringify(nuevaLista));
  return nuevaLista;
};

export default boletas;
