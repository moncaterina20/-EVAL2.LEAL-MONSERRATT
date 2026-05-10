// Datos para mostrar en la pagina sin repetir tanto HTML.
const tramites = [
  {
    nombre: 'Permiso de circulacion',
    categoria: 'Vehiculos',
    descripcion: 'Informacion para pagar o consultar el permiso anual.'
  },
  {
    nombre: 'Patente comercial',
    categoria: 'Comercio',
    descripcion: 'Orientacion para iniciar una actividad comercial.'
  },
  {
    nombre: 'Certificado de residencia',
    categoria: 'Certificados',
    descripcion: 'Solicitud para acreditar domicilio dentro de la comuna.'
  },
  {
    nombre: 'Programas sociales',
    categoria: 'Dideco',
    descripcion: 'Apoyo social, adulto mayor y beneficios municipales.'
  },
  {
    nombre: 'Retiro de residuos',
    categoria: 'Medio ambiente',
    descripcion: 'Solicitud de apoyo para residuos grandes o voluminosos.'
  }
];

const noticias = [
  {
    titulo: 'Operativo de atencion vecinal',
    fecha: '10 de mayo de 2026',
    texto: 'Equipos municipales atenderan consultas sociales y comunitarias.'
  },
  {
    titulo: 'Campana de invierno',
    fecha: '16 de mayo de 2026',
    texto: 'Informacion para familias que necesiten orientacion municipal.'
  },
  {
    titulo: 'Talleres culturales',
    fecha: '22 de mayo de 2026',
    texto: 'Inscripciones abiertas para actividades culturales de la comuna.'
  }
];

let avisosAgregados = 0;

function mostrarTramites(busqueda) {
  const listaTramites = document.getElementById('listaTramites');
  const contadorTramites = document.getElementById('contadorTramites');
  const textoBusqueda = busqueda.toLowerCase();

  listaTramites.innerHTML = '';

  const resultado = tramites.filter(function (tramite) {
    const textoCompleto = tramite.nombre + ' ' + tramite.categoria + ' ' + tramite.descripcion;
    return textoCompleto.toLowerCase().includes(textoBusqueda);
  });

  resultado.forEach(function (tramite) {
    listaTramites.innerHTML += `
      <div class="col-md-6">
        <article class="tramite-card">
          <span class="badge text-bg-success mb-2">${tramite.categoria}</span>
          <h3 class="h5">${tramite.nombre}</h3>
          <p>${tramite.descripcion}</p>
          <button class="btn btn-outline-success btn-sm boton-favorito" type="button">
            <i class="bi bi-star" aria-hidden="true"></i> Favorito
          </button>
        </article>
      </div>
    `;
  });

  contadorTramites.textContent = 'Resultados encontrados: ' + resultado.length;
}

function mostrarNoticias() {
  const listaNoticias = document.getElementById('listaNoticias');
  listaNoticias.innerHTML = '';

  noticias.forEach(function (noticia) {
    listaNoticias.innerHTML += `
      <div class="col-md-4">
        <article class="noticia-card">
          <small class="text-muted">${noticia.fecha}</small>
          <h3 class="h5 mt-2">${noticia.titulo}</h3>
          <p>${noticia.texto}</p>
        </article>
      </div>
    `;
  });
}

function validarNombre() {
  const nombre = document.getElementById('nombre');
  const errorNombre = document.getElementById('errorNombre');

  if (nombre.value.trim() === '') {
    nombre.classList.add('is-invalid');
    nombre.classList.remove('is-valid');
    errorNombre.textContent = 'Debe ingresar su nombre.';
    return false;
  }

  if (nombre.value.trim().length < 3) {
    nombre.classList.add('is-invalid');
    nombre.classList.remove('is-valid');
    errorNombre.textContent = 'El nombre debe tener minimo 3 caracteres.';
    return false;
  }

  nombre.classList.remove('is-invalid');
  nombre.classList.add('is-valid');
  errorNombre.textContent = 'Nombre correcto.';
  return true;
}

function validarCorreo() {
  const correo = document.getElementById('correo');
  const errorCorreo = document.getElementById('errorCorreo');

  if (correo.value.trim() === '') {
    correo.classList.add('is-invalid');
    correo.classList.remove('is-valid');
    errorCorreo.textContent = 'Debe ingresar su correo.';
    return false;
  }

  if (!correo.checkValidity()) {
    correo.classList.add('is-invalid');
    correo.classList.remove('is-valid');
    errorCorreo.textContent = 'Ingrese un correo valido.';
    return false;
  }

  correo.classList.remove('is-invalid');
  correo.classList.add('is-valid');
  errorCorreo.textContent = 'Correo correcto.';
  return true;
}

function validarMensaje() {
  const mensaje = document.getElementById('mensaje');
  const errorMensaje = document.getElementById('errorMensaje');

  if (mensaje.value.trim() === '') {
    mensaje.classList.add('is-invalid');
    mensaje.classList.remove('is-valid');
    errorMensaje.textContent = 'Debe escribir un mensaje.';
    return false;
  }

  if (mensaje.value.trim().length < 12) {
    mensaje.classList.add('is-invalid');
    mensaje.classList.remove('is-valid');
    errorMensaje.textContent = 'El mensaje debe tener minimo 12 caracteres.';
    return false;
  }

  mensaje.classList.remove('is-invalid');
  mensaje.classList.add('is-valid');
  errorMensaje.textContent = 'Mensaje correcto.';
  return true;
}

function borrarEstilosFormulario() {
  document.getElementById('nombre').classList.remove('is-valid', 'is-invalid');
  document.getElementById('correo').classList.remove('is-valid', 'is-invalid');
  document.getElementById('mensaje').classList.remove('is-valid', 'is-invalid');
  document.getElementById('errorNombre').textContent = '';
  document.getElementById('errorCorreo').textContent = '';
  document.getElementById('errorMensaje').textContent = '';
}

function iniciarEventos() {
  const botonContraste = document.getElementById('btnContraste');
  const buscador = document.getElementById('buscadorTramites');
  const listaTramites = document.getElementById('listaTramites');
  const botonAgregarAviso = document.getElementById('btnAgregarAviso');
  const formulario = document.getElementById('formContacto');

  // Evento click: cambia el contraste del sitio.
  botonContraste.addEventListener('click', function () {
    document.body.classList.toggle('modo-contraste');

    if (document.body.classList.contains('modo-contraste')) {
      botonContraste.setAttribute('aria-pressed', 'true');
    } else {
      botonContraste.setAttribute('aria-pressed', 'false');
    }
  });

  // Evento input: filtra los tramites mientras se escribe.
  buscador.addEventListener('input', function () {
    mostrarTramites(buscador.value);
  });

  // Evento click: marca un tramite como favorito.
  listaTramites.addEventListener('click', function (evento) {
    const boton = evento.target.closest('.boton-favorito');

    if (boton !== null) {
      boton.classList.remove('btn-outline-success');
      boton.classList.add('btn-success');
      boton.innerHTML = '<i class="bi bi-star-fill" aria-hidden="true"></i> Guardado';
    }
  });

  // Evento click: agrega una noticia nueva al DOM.
  botonAgregarAviso.addEventListener('click', function () {
    avisosAgregados++;

    noticias.unshift({
      titulo: 'Aviso agregado ' + avisosAgregados,
      fecha: '30 de mayo de 2026',
      texto: 'Este aviso se agrego dinamicamente con JavaScript.'
    });

    mostrarNoticias();
  });

  // Eventos input y blur: validaciones en tiempo real.
  document.getElementById('nombre').addEventListener('input', validarNombre);
  document.getElementById('nombre').addEventListener('blur', validarNombre);
  document.getElementById('correo').addEventListener('input', validarCorreo);
  document.getElementById('correo').addEventListener('blur', validarCorreo);
  document.getElementById('mensaje').addEventListener('input', validarMensaje);
  document.getElementById('mensaje').addEventListener('blur', validarMensaje);

  // Evento submit: revisa todo antes de enviar.
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const nombreOk = validarNombre();
    const correoOk = validarCorreo();
    const mensajeOk = validarMensaje();
    const resultado = document.getElementById('resultadoFormulario');

    if (nombreOk && correoOk && mensajeOk) {
      resultado.textContent = 'Formulario enviado correctamente.';
      resultado.className = 'mt-3 mb-0 fw-bold texto-ok';
      formulario.reset();
      borrarEstilosFormulario();
    } else {
      resultado.textContent = 'Revise los datos antes de enviar.';
      resultado.className = 'mt-3 mb-0 fw-bold texto-error';
    }
  });
}

function iniciarPagina() {
  mostrarTramites('');
  mostrarNoticias();
  iniciarEventos();
}

// Simula el ciclo de vida: el JS se inicia cuando carga el HTML.
document.addEventListener('DOMContentLoaded', iniciarPagina);
