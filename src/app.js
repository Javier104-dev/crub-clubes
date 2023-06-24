const express = require('express');
const path = require('path');
const cors = require('cors');
const { verClubes, verClub, crearClub, editarClub, eliminarClub } = require('./clubesServices.js');
const { upload } = require('./utilidades.js');
require('dotenv').config();

const app = express();
const rutaJson = path.join(__dirname, '../data/equipos.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../imagenes')));

app.use(cors({
  origin: '*',
}));

app.get('/clubes', async (req, res) => {
  try {
    const clubes = await verClubes(rutaJson);
    res.json(clubes);

  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.get('/clubes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const club = await verClub(rutaJson, Number(id));
    res.status(200).json(club);

  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.post('/clubes', upload.single('escudo'), async (req, res) => {
  const { pais, name, address, website, clubColors, phone } = req.body;
  const filename = req.file?.filename;

  try {
    const club = await crearClub(rutaJson, filename, { pais, name, address, website, clubColors, phone });
    res.status(200).json({ msg: 'Nuevo equipo agregado', club });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/clubes/:id', upload.single('escudo'), async (req, res) => {
  const { id } = req.params;
  const { pais, name, address, website, clubColors, phone } = req.body;
  const filename = req.file?.filename;

  try {
    const club = await editarClub(rutaJson, filename, { pais, name, address, website, clubColors, phone, id: Number(id) });
    res.status(200).json({ msg: 'Equipo actualizado', club });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/clubes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const club = await eliminarClub(rutaJson, Number(id));
    res.status(200).json({ msg: 'Equipo eliminado', club });

  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({ 404: 'Pagina no encontrada' });
});

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
  console.log(`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/clubes`);
});
