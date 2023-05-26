const express = require('express');
const fs = require('fs');

const app = express();
const PUERTO = 8080;

app.use(express.json());

app.get('/equipos', (request, response) => {
  const equiposData = fs.readFileSync('../data/equipos.json');
  const equipos = JSON.parse(equiposData);
  response.setHeader('Content-Type', 'application/json');
  response.send(equipos);
});

app.get('/equipos/:id', (request, response) => {
  const equiposData = fs.readFileSync('../data/equipos.json');
  const equipos = JSON.parse(equiposData);
  const equipoEncontrado = equipos.find((equipo) => (equipo.id === Number(request.params.id)));
  if (equipoEncontrado) {
    response.setHeader('Content-Type', 'application/json');
    response.send(equipoEncontrado);
  } else {
    response.status(404).json({ msg: 'Equipo not found' });
  }
});

app.post('/equipos', (request, response) => {
  const data = fs.readFileSync('../data/equipos.json');
  const dataJson = JSON.parse(data);
  const nuevoId = dataJson.length + 1;

  request.body.id = nuevoId;
  dataJson.push(request.body);

  const nuevoEquipo = JSON.stringify(dataJson, null, 2);

  fs.writeFile('../data/equipos.json', nuevoEquipo, (error) => {
    if (error) {
      response.status(404).json({ msg: 'Todo not found' });
    }
    return response.status(200).json({ msg: 'Nueva pelicula agregada' });
  });
});

app.patch('/equipos/:id', (request, response) => {
  const {
    nombre,
    club,
    ano,
    ciudad,
    miembros,
  } = request.body;

  const data = fs.readFileSync('../data/equipos.json');
  const dataJson = JSON.parse(data);
  const equipoEncontrado = dataJson.find((equipo) => (equipo.id === Number(request.params.id)));
  if (equipoEncontrado) {
    equipoEncontrado.nombre = nombre ?? equipoEncontrado.nombre;
    equipoEncontrado.club = club ?? equipoEncontrado.club;
    equipoEncontrado.ano = ano ?? equipoEncontrado.ano;
    equipoEncontrado.ciudad = ciudad ?? equipoEncontrado.ciudad;
    equipoEncontrado.miembros = miembros ?? equipoEncontrado.miembros;
  }

  const equiposActualizados = JSON.stringify(dataJson, null, 2);
  fs.writeFile('../data/equipos.json', equiposActualizados, (error) => {
    if (error) {
      response.status(400).json({ msg: 'Error al actualizar el equipo' });
    }
    return response.status(200).json({ msg: 'Equipo actualizado', equipo: equipoEncontrado });
  });
});

app.delete('/equipos/:id', (request, response) => {
  const data = fs.readFileSync('../data/equipos.json');
  const dataJson = JSON.parse(data);
  const equipoIndex = dataJson.findIndex((equipo) => (equipo.id === Number(request.params.id)));
  if (equipoIndex) {
    dataJson.splice(equipoIndex, 1);
    const equipoEliminado = JSON.stringify(dataJson, null, 2);
    fs.writeFile('../data/equipos.json', equipoEliminado, (error) => {
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
