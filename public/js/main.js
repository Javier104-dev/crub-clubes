const url = 'http://localhost:8080/club';

const obtenerClubes = async () => {
  const respuesta = await fetch(`${url}`);
  return respuesta.json();
};

const crearRegistro = (objeto) => {
  const tabla = document.querySelector('#equipos__tabla');
  const tablaTr = document.createElement('tr');
  tablaTr.classList.add('equipos__tabla__registros');
  const tablaTr1 = document.createElement('td');
  tablaTr1.classList.add('equipos__tabla__registro');
  tablaTr1.textContent = objeto.name;
  tablaTr.appendChild(tablaTr1);
  const tablaTr2 = document.createElement('td');
  tablaTr2.classList.add('equipos__tabla__registro');
  tablaTr2.textContent = objeto.area.name;
  tablaTr.appendChild(tablaTr2);
  tabla.appendChild(tablaTr);
  return tabla;
};

const crearPagina = async () => {
  const datos = await obtenerClubes();
  datos.forEach((equipo) => {
    crearRegistro(equipo);
  });
};

crearPagina();
