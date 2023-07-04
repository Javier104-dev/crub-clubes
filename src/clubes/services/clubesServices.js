const { leerJson, escribirJson } = require("../model/clubesModel.js");
const { borrarImagen, constructorCrear, crearId } = require("../utilities/utilidades.js");

const verClubes = async () => {
  const clubes = await leerJson();
  return clubes;
};

const verClub = async (id) => {
  if (!id) throw new Error("Id invalido");

  const clubes = await leerJson();
  const club = clubes.find((elemento) => elemento.id === id);

  if (!club) throw new Error("Club inexistente");

  club.escudo = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${club.escudo}`;

  return club;
};

const crearClub = async (filename, club) => {
  const { pais, name, address, website, clubColors, phone } = club;

  if (!pais || !name || !address || !website || !clubColors || !phone) throw new Error("Datos incompletos");

  const clubes = await leerJson();
  const nuevoClub = { ...constructorCrear(club, filename, undefined), id: crearId() };
  clubes.push(nuevoClub);
  await escribirJson(clubes);

  return nuevoClub;
};

const editarClub = async (filename, club) => {
  const { pais, name, address, website, clubColors, phone, id } = club;

  if (!pais || !name || !address || !website || !clubColors || !phone || !id) throw new Error("Datos incompletos");

  const clubes = await leerJson();
  const indice = clubes.findIndex((elemento) => elemento.id === id);

  if (!indice) throw new Error("El club no se encuentra en nuestra base de datos");

  clubes[indice] = constructorCrear(club, filename, clubes[indice]);
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