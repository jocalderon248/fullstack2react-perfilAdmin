import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout.jsx';
import AdminLayout from './admin/AdminLayout';

import Home from './Home.jsx';
import Contacto from './contacto.jsx';
import Registro from './Registro.jsx';
import InicioSesion from './InicioSesion.jsx';
import Blog from './Blog.jsx';
import Productos from './Productos.jsx';
import DetalleProducto from './DetalleProducto.jsx';
import Noticia1 from './noticia1.jsx';
import Noticia2 from './noticia2.jsx';
import Carrito from './Carrito.jsx';
import Usuarios from './admin/usuarios';
import ProductosAdmin from "./admin/ProductosAdmin.jsx";
import CategoriasAdmin from "./admin/CategoriasAdmin.jsx";
import OrdenesAdmin from "./admin/OrdenesAdmin.jsx"; 
import Dashboard  from './admin/Dashboard.jsx';
import Reportes from './admin/reportes.jsx';
import PerfilAdmin from './admin/PerfilAdmin.jsx';
export default function App() {
	const location = useLocation();

	useEffect(() => {
		document.body.classList.remove('route-registro');
		document.body.classList.remove('route-inicio-sesion');

		if (location.pathname === '/Registro') {
			document.body.classList.add('route-registro');
		} else if (location.pathname === '/inicio-sesion') {
			document.body.classList.add('route-inicio-sesion');
		}
	}, [location]);

	return (
		<Routes>
			<Route path="/" element={<MainLayout><Home /></MainLayout>} />
			<Route path="/contacto" element={<MainLayout><Contacto /></MainLayout>} />
			<Route path="/inicio-sesion" element={<MainLayout><InicioSesion /></MainLayout>} />
			<Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
			<Route path="/productos" element={<MainLayout><Productos /></MainLayout>} />
			<Route path="/carrito" element={<MainLayout><Carrito /></MainLayout>} />
			<Route path="/detalle-producto" element={<MainLayout><DetalleProducto /></MainLayout>} />
			<Route path="/detalle-producto/:index" element={<MainLayout><DetalleProducto /></MainLayout>} />
			<Route path="/noticia1" element={<MainLayout><Noticia1 /></MainLayout>} />
			<Route path="/noticia2" element={<MainLayout><Noticia2 /></MainLayout>} />
			<Route path="/Registro" element={<MainLayout><Registro /></MainLayout>} />
			<Route path="/usuarios" element={<AdminLayout><Usuarios /></AdminLayout>}/>
			<Route path="/productos-admin" element={<AdminLayout><ProductosAdmin /></AdminLayout>} />
			<Route path="/categorias-admin" element={<AdminLayout><CategoriasAdmin /></AdminLayout>}/>
			<Route path="/ordenes-admin" element={<AdminLayout><OrdenesAdmin /></AdminLayout>}/>
			<Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>}/>
			<Route path="/reportes" element={<AdminLayout><Reportes /></AdminLayout>}/>
			<Route path="/perfil-admin" element={<AdminLayout><PerfilAdmin /></AdminLayout>}/>
			<Route path="*" element={<MainLayout><h2>404: Página no encontrada</h2></MainLayout>} />
		</Routes>
	);
}
