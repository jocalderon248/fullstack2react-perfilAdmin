// src/utils/validaciones.js

// Función para validar correo y contraseña (Login)
export function validarCorreoYContraseña(event, email, password, setEmailError, setPasswordError) {
  event.preventDefault();

  const termina = ["@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"];
  let correoValido = false;

  for (let i = 0; i < termina.length; i++) {
    if (email.endsWith(termina[i])) {
      correoValido = true;
      break;
    }
  }

  // Validación de correo
  if (!email) {
    setEmailError('Correo no ingresado.');
    return false;
  } else if (email.length > 100) {
    setEmailError('Correo demasiado largo.');
    return false;
  } else if (!correoValido) {
    setEmailError('Correo no válido. Debe terminar en "@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"');
    return false;
  } else {
    setEmailError('');
  }

  // Validación de contraseña
  if (!password) {
    setPasswordError('Contraseña no ingresada.');
    return false;
  } else if (password.length < 4 || password.length > 10) {
    setPasswordError('Contraseña inválida.');
    return false;
  } else {
    setPasswordError('');
  }

  return true;
}

// Función para validar registro de usuario
export function validarRegistro(event, nombre, email, password, confirmarPassword, telefono, region, comuna, setNombreError, setEmailError, setPasswordError, setConfirmarPasswordError, setTelefonoError, setRegionError, setComunaError, setRegistroExitoso) {
  event.preventDefault();

  const termina = ["@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"];
  let correoValido = false;

  // Validación de nombre
  if (!nombre) {
    setNombreError('Nombre no ingresado');
    return false;
  } else if (nombre.length < 3 || nombre.length > 50) {
    setNombreError('Nombre demasiado corto o largo');
    return false;
  } else {
    setNombreError('');
  }

  // Validación de correo
  for (let i = 0; i < termina.length; i++) {
    if (email.endsWith(termina[i])) {
      correoValido = true;
      break;
    }
  }

  if (!email) {
    setEmailError('Correo no ingresado');
    return false;
  } else if (email.length > 100) {
    setEmailError('Correo demasiado largo');
    return false;
  } else if (!correoValido) {
    setEmailError('Correo no válido. Debe terminar en "@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"');
    return false;
  } else {
    setEmailError('');
  }

  // Validación de contraseña
  if (!password) {
    setPasswordError('Contraseña no ingresada');
    return false;
  } else if (password.length < 4 || password.length > 10) {
    setPasswordError('Contraseña inválida. Debe tener entre 4 y 10 caracteres');
    return false;
  } else {
    setPasswordError('');
  }

  // Confirmación de contraseña
  if (confirmarPassword !== password) {
    setConfirmarPasswordError('Las contraseñas no coinciden');
    return false;
  } else {
    setConfirmarPasswordError('');
  }

  // Validación de teléfono
  if (!telefono) {
    setTelefonoError('No ingresó su teléfono');
    return false;
  } else if (telefono.length !== 9) {
    setTelefonoError('El teléfono debe tener 9 dígitos');
    return false;
  } else {
    setTelefonoError('');
  }

  // Validación de región
  if (!region) {
    setRegionError('No ingresó su región');
    return false;
  } else if (region.length < 4 || region.length > 20) {
    setRegionError('Región demasiado corta o larga');
    return false;
  } else {
    setRegionError('');
  }

  // Validación de comuna
  if (!comuna) {
    setComunaError('No ingresó su comuna');
    return false;
  } else if (comuna.length < 4 || comuna.length > 20) {
    setComunaError('Comuna demasiado corta o larga');
    return false;
  } else {
    setComunaError('');
  }

  setRegistroExitoso('Registro Exitoso');
  return true;
}

// Función para validar formulario de contacto
export function validarContacto(event, nombre, email, texto, setNombreError, setEmailError, setTextoError, setEnviado) {
  event.preventDefault();

  const termina = ["@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"];
  let correoValido = false;

  // Validación de nombre
  if (!nombre) {
    setNombreError('Nombre no ingresado');
    return false;
  } else if (nombre.length < 3 || nombre.length > 50) {
    setNombreError('Nombre demasiado corto o largo');
    return false;
  } else {
    setNombreError('');
  }

  // Validación de correo
  for (let i = 0; i < termina.length; i++) {
    if (email.endsWith(termina[i])) {
      correoValido = true;
      break;
    }
  }

  if (!email) {
    setEmailError('Correo no ingresado.');
    return false;
  } else if (email.length > 100) {
    setEmailError('Correo demasiado largo.');
    return false;
  } else if (!correoValido) {
    setEmailError('Correo no válido. Debe terminar en "@duocuc.cl", "@profesor.duoc.cl", "@gmail.com"');
    return false;
  } else {
    setEmailError('');
  }

  // Validación de comentario
  if (!texto) {
    setTextoError('Comentario no ingresado');
    return false;
  } else if (texto.length > 500) {
    setTextoError('Comentario demasiado largo');
    return false;
  } else {
    setTextoError('');
  }

  setEnviado('Mensaje Enviado');
  return true;
}
