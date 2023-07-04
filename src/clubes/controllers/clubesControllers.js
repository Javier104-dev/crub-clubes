const {
  verClubes: verClubesServices,
  verClub: verClubServices,
  crearClub: crearClubServices,
  editarClub: editarClubServices,
  eliminarClub: eliminarClubServices
} = require("../services/clubesServices.js");

const verClubes = async (req, res) => {
  try {
    const clubes = await verClubesServices();
    res.json(clubes);

  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
};

const verClub = async (req, res) => {
  const { id } = req.params;

  try {
    const club = await verClubServices(Number(id));
    res.status(200).json(club);

  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
};

const crearClub = async (req, res) => {
  const { pais, name, address, website, clubColors, phone } = req.body;
  const filename = req.file?.filename;

  try {
    const club = await crearClubServices(filename, { pais, name, address, website, clubColors, phone });
    res.status(200).json({ msg: 'Nuevo equipo agregado', club });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editarClub = async (req, res) => {
  const { id } = req.params;
  const { pais, name, address, website, clubColors, phone } = req.body;
  const filename = req.file?.filename;

  try {
    const club = await editarClubServices(filename, { pais, name, address, website, clubColors, phone, id: Number(id) });
    res.status(200).json({ msg: 'Equipo actualizado', club });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarClub = async (req, res) => {
  const { id } = req.params;

  try {
    const club = await eliminarClubServices(Number(id));
    res.status(200).json({ msg: 'Equipo eliminado', club });

  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor', error: error.message });
  }
};

const paginaNoEncontrada = async (req, res) => {
  res.status(404).json({ 404: 'Pagina no encontrada' });
};

module.exports = {
  verClubes,
  verClub,
  crearClub,
  editarClub,
  eliminarClub,
  paginaNoEncontrada
};