const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const u = require('./utilidadesFs.js');

const app = express();
const PUERTO = 8080;
const HOST = '127.0.0.1';

const rutaJson = path.join(__dirname, '../data/equipos.json');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './imagenes');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use(cors({
  origin: '*',
}));

app.use(express.static(path.join(__dirname, '../imagenes')));

app.get('/clubes', async (request, response) => {
  try {
    response.json(await u.leerJson(rutaJson));
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.get('/club/:id/ver', async (request, response) => {
  try {
    const clubesData = await u.leerJson(rutaJson);
    const clubEncontrado = clubesData.find((equipo) => (equipo.id === Number(request.params.id)));
    clubEncontrado.escudo = `http://${HOST}:${PUERTO}/${clubEncontrado.escudo}`;

    if (clubEncontrado) {
      response.json(clubEncontrado);
      return;
    }
    response.status(404).json({ msg: 'Equipo no encontrado' });
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.post('/club/agregar', upload.single('escudo'), async (request, response) => {
  const {
    pais,
    name,
    address,
    website,
    clubColors,
    phone,
  } = request.body;

  if (!pais || !name || !address || !website || !clubColors || !phone) {
    response.status(400).json({ msg: 'Datos incorrectos' });
    return;
  }

  try {
    const clubesData = await u.leerJson(rutaJson);
    const nuevoId = Date.now();

    const nuevoClub = {
      area: {
        name: pais,
      },
      name,
      address,
      website,
      clubColors,
      phone,
      escudo: request.file?.filename || name,
    };

    nuevoClub.id = nuevoId;
    clubesData.push(nuevoClub);

    const clubesModificados = JSON.stringify(clubesData, null, 2);
    await u.escribirJson(rutaJson, clubesModificados);
    response.status(200).json({ msg: 'Nuevo equipo agregado' });
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.patch('/club/:id/editar', upload.single('escudo'), async (request, response) => {
  const {
    pais,
    name,
    address,
    website,
    clubColors,
    phone,
  } = request.body;

  try {
    const clubesData = await u.leerJson(rutaJson);
    const equipoEncontrado = clubesData.find((equipo) => (equipo.id === Number(request.params.id)));

    if (equipoEncontrado) {
      equipoEncontrado.area.name = pais;
      equipoEncontrado.name = name;
      equipoEncontrado.address = address;
      equipoEncontrado.website = website;
      equipoEncontrado.clubColors = clubColors;
      equipoEncontrado.phone = phone;
      equipoEncontrado.escudo = request.file?.filename || equipoEncontrado.escudo;
    } else {
      response.status(404).json({ msg: 'Equipo no encontrado' });
      return;
    }
    const equiposActualizados = JSON.stringify(clubesData, null, 2);
    await u.escribirJson(rutaJson, equiposActualizados);
    response.status(200).json({ msg: 'Equipo actualizado', equipo: equipoEncontrado });
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.delete('/club/:id/eliminar', async (request, response) => {
  try {
    const clubesData = await u.leerJson(rutaJson);
    const equipoIndex = clubesData.findIndex((equipo) => (equipo.id === Number(request.params.id)));

    if (equipoIndex >= 0) {
      clubesData.splice(equipoIndex, 1);
      const equipoEliminado = JSON.stringify(clubesData, null, 2);
      await u.escribirJson(rutaJson, equipoEliminado);

      response.status(200).json({ msg: 'Equipo eliminado' });
    } else {
      response.status(404).json({ msg: 'Equipo no encontrado' });
    }
  } catch (error) {
    response.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.use('*', (request, response) => {
  response.status(404).json({ 404: 'Pagina no encontrada' });
});

app.listen(PUERTO, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor corriendo en puerto http://${HOST}:${PUERTO}`);
});
