function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const usuarios = [
  {
    id: uid(),
    nombre: "Juan Perez",
    email: "juan@gmail.com",
    contraseña: "admin123", 
    telefono: "912345678",
    region: "Metropolitana",
    comuna: "Santiago",
    rol: "admin",
    compras: [
      { id: uid(), titulo: "Persona 3: Reload", price: 18500, fecha: "2025-10-01" },
      { id: uid(), titulo: "Elden Ring", price: 30000, fecha: "2025-10-12" },
    ],
  },
  {
    id: uid(),
    nombre: "Maria Lopez",
    email: "maria@duocuc.cl",
    contraseña: "usuario123", 
    telefono: "987654321",
    region: "Valparaíso",
    comuna: "Valparaíso",
    rol: "usuario",
    compras: [
      { id: uid(), titulo: "SilkSong", price: 10500, fecha: "2025-09-21" },
    ],
  },
];

export default usuarios;
