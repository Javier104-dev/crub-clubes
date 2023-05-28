const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PUERTO = 8080;
const rutaJson = '../data/equipos.json';

app.use(cors({
  origin: 'http://127.0.0.1:5500',
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', express.static(path.join(__dirname, '../public/views')));

app.use('/equipo/:id/ver', express.static(path.join(__dirname, '../public/views')));

app.use('/agregar', express.static(path.join(__dirname, '../public/views')));

app.use('/equipo/:id/editar', express.static(path.join(__dirname, '../public/views')));

app.get('/club', (request, response) => {
  const equiposData = fs.readFileSync(rutaJson);
  const equipos = JSON.parse(equiposData);
  response.setHeader('Content-Type', 'application/json');
  response.send(equipos);
});

app.get('/club/:id/ver', (request, response) => {
  const equiposData = fs.readFileSync(rutaJson);
  const equipos = JSON.parse(equiposData);
  const equipoEncontrado = equipos.find((equipo) => (equipo.id === Number(request.params.id)));
  if (equipoEncontrado) {
    response.setHeader('Content-Type', 'application/json');
    response.send(equipoEncontrado);
  } else {
    response.status(404).json({ msg: 'Equipo not found' });
  }
});

app.post('/club/agregar', (request, response) => {
  const data = fs.readFileSync(rutaJson);
  const dataObjeto = JSON.parse(data);
  const nuevoId = dataObjeto.length + 1;

  request.body.id = nuevoId;
  dataObjeto.push(request.body);

  const nuevoEquipo = JSON.stringify(dataObjeto, null, 2);

  fs.writeFile(rutaJson, nuevoEquipo, (error) => {
    if (error) {
      response.status(404).json({ msg: 'Todo not found' });
    }
    return response.status(200).json({ msg: 'Nuevo equipo agregado' });
  });
});

app.patch('/club/:id/editar', (request, response) => {
  const {
    nombre,
    club,
    ano,
    ciudad,
    miembros,
  } = request.body;

  const data = fs.readFileSync(rutaJson);
  const dataObjeto = JSON.parse(data);
  const equipoEncontrado = dataObjeto.find((equipo) => (equipo.id === Number(request.params.id)));
  if (equipoEncontrado) {
    equipoEncontrado.nombre = nombre ?? equipoEncontrado.nombre;
    equipoEncontrado.club = club ?? equipoEncontrado.club;
    equipoEncontrado.ano = ano ?? equipoEncontrado.ano;
    equipoEncontrado.ciudad = ciudad ?? equipoEncontrado.ciudad;
    equipoEncontrado.miembros = miembros ?? equipoEncontrado.miembros;
  }

  const equiposActualizados = JSON.stringify(dataObjeto, null, 2);
  fs.writeFile(rutaJson, equiposActualizados, (error) => {
    if (error) {
      response.status(400).json({ msg: 'Error al actualizar el equipo' });
    }
    return response.status(200).json({ msg: 'Equipo actualizado', equipo: equipoEncontrado });
  });
});

app.delete('/club/:id/eliminar', (request, response) => {
  const data = fs.readFileSync(rutaJson);
  const dataObjeto = JSON.parse(data);
  const equipoIndex = dataObjeto.findIndex((equipo) => (equipo.id === Number(request.params.id)));
  if (equipoIndex) {
    dataObjeto.splice(equipoIndex, 1);
    const equipoEliminado = JSON.stringify(dataObjeto, null, 2);
    fs.writeFile(rutaJson, equipoEliminado, (error) => {
      if (error) {
        response.status(400).json({ msg: 'El equipo no se pudo eliminar' });
      }
      return response.status(400).json({ msg: 'Equipo eliminado', equipoEliminado: equipoIndex });
    });
  }
});

app.listen(PUERTO, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor corriendo en puerto ${PUERTO}`);
});
