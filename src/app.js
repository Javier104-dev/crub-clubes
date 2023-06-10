const express = require('express');
const fs = require('fs');
const path = require('path');
// const cors = require('cors');

const app = express();
const PUERTO = 8080;
const HOST = '127.0.0.1';
const rutaJson = path.join(__dirname, '../data/equipos.json');

// app.use(cors({
//   origin: 'http://127.0.0.1:5500',
// }));

app.get('/club', (request, response) => {
  try {
    const equiposData = fs.readFileSync(rutaJson);
    const equipos = JSON.parse(equiposData);

    response.setHeader('Content-Type', 'application/json');
    response.send(equipos);
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.get('/club/:id/ver', (request, response) => {
  try {
    const equiposData = fs.readFileSync(rutaJson);
    const equipos = JSON.parse(equiposData);
    const equipoEncontrado = equipos.find((equipo) => (equipo.id === Number(request.params.id)));

    if (equipoEncontrado) {
      response.json(equipoEncontrado);
    } else {
      response.status(404).json({ msg: 'Equipo no encontrado' });
    }
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.post('/club/agregar', (request, response) => {
  try {
    const data = fs.readFileSync(rutaJson);
    const dataObjeto = JSON.parse(data);
    const nuevoId = dataObjeto.length + 1;

    request.body.id = nuevoId;
    dataObjeto.push(request.body);

    const nuevoEquipo = JSON.stringify(dataObjeto, null, 2);

    fs.writeFile(rutaJson, nuevoEquipo, (error) => {
      if (error) {
        response.status(500).json({ msg: 'No se pudo agregar el nuevo equipo' });
      }
      return response.status(200).json({ msg: 'Nuevo equipo agregado' });
    });
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.patch('/club/:id/editar', (request, response) => {
  const {
    nombre,
    club,
    ano,
    ciudad,
    miembros,
  } = request.body;

  try {
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
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.delete('/club/:id/eliminar', (request, response) => {
  try {
    const data = fs.readFileSync(rutaJson);
    const dataObjeto = JSON.parse(data);
    const equipoIndex = dataObjeto.findIndex((equipo) => (equipo.id === Number(request.params.id)));

    if (equipoIndex >= 0) {
      dataObjeto.splice(equipoIndex, 1);
      const equipoEliminado = JSON.stringify(dataObjeto, null, 2);
      fs.writeFile(rutaJson, equipoEliminado, (error) => {
        if (error) {
          response.status(500).json({ msg: 'No se pudo eliminar el equipo', error: error.message });
        }
        return response.status(200).json({ msg: 'Equipo eliminado', equipoEliminado: equipoIndex });
      });
    } else {
      response.status(404).json({ msg: 'Equipo no encontrado' });
    }
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.listen(PUERTO, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor corriendo en puerto http://${HOST}:${PUERTO}`);
});
