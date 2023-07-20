const { HOST, PORT } = require("../../config/config.js");
const { leerJson, escribirJson } = require("../model/clubesModel.js");
const { borrarImagen, mapperClubes, crearId } = require("../utilities/utilidades.js");

const verClubes = async () => {
  const clubes = await leerJson();
  return clubes;
};

const verClub = async (id) => {
  if (!id) throw new Error("Id no definido");

  const clubes = await leerJson();
  const club = clubes.find((elemento) => elemento.id === id);

  if (!club) throw new Error("El id no corresponde a un club registrado");

  club.escudo = `http://${HOST}:${PORT}/${club.escudo}`;

  return club;
};

const crearClub = async (filename, club) => {
  const { pais, name, address, website, clubColors, phone } = club;

  if (!pais || !name || !address || !website || !clubColors || !phone) throw new Error("Datos incompletos");

  const clubes = await leerJson();
  const nuevoClub = { ...mapperClubes(club, filename, undefined), id: crearId() };
  clubes.push(nuevoClub);

  await escribirJson(clubes);

  return nuevoClub;
};

const editarClub = async (filename, club) => {
  const { pais, name, address, website, clubColors, phone, id } = club;

  if (!pais || !name || !address || !website || !clubColors || !phone || !id) throw new Error("Datos incompletos");

  const clubes = await leerJson();
  const indice = clubes.findIndex((elemento) => elemento.id === id);

  if (!indice) throw new Error("El id no corresponde a un club registrado");

  clubes[indice] = { ...mapperClubes(club, filename, clubes[indice]), id };

  await escribirJson(clubes);

  return clubes[indice];
};

const eliminarClub = async (id) => {
  if (!id) throw new Error("El id no esta definido");

  const clubes = await leerJson();
  const indice = clubes.findIndex((elemento) => (elemento.id === id));

  if (indice < 0) throw new Error("El club no se encuentra en la base de datos");

  const club = clubes[indice];
  clubes.splice(indice, 1);
  borrarImagen(club);
  await escribirJson(clubes);

  return club;
};

module.exports = {
  verClub,
  verClubes,
  crearClub,
  editarClub,
  eliminarClub
};