const { leerJson, escribirJson } = require("./jsonFileHandler.js");
const { crearId, reemplazarImagen, borrarImagen } = require("./utilidades.js");

const verClubes = async (ruta) => {
  const clubes = await leerJson(ruta);
  return clubes;
};

const verClub = async (ruta, id) => {
  if (!id) throw new Error("Id invalido");

  const clubes = await leerJson(ruta);
  const club = clubes.find((elemento) => elemento.id === id);

  if (!club) throw new Error("Club inexistente");

  club.escudo = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${club.escudo}`;

  return club;
};

const crearClub = async (ruta, filename, club) => {
  const { pais, name, address, website, clubColors, phone } = club;

  if (!pais || !name || !address || !website || !clubColors || !phone) throw new Error("Datos incompletos");

  const clubes = await leerJson(ruta);
  const nuevoClub = {
    area: {
      name: pais,
    },
    name,
    address,
    website,
    clubColors,
    phone,
    escudo: filename || name,
    id: crearId(),
  };

  clubes.push(nuevoClub);
  await escribirJson(ruta, clubes);

  return nuevoClub;
};

const editarClub = async (ruta, filename, club) => {
  const { pais, name, address, website, clubColors, phone, id } = club;

  if (!pais || !name || !address || !website || !clubColors || !phone || !id) throw new Error("Datos incompletos");

  const clubes = await leerJson(ruta);
  const clubF = clubes.find((elemento) => elemento.id === id);

  if (!clubF) throw new Error("El club no se encuentra en nuestra base de datos");

  clubF.area.name = pais;
  clubF.name = name;
  clubF.address = address;
  clubF.website = website;
  clubF.clubColors = clubColors;
  clubF.phone = phone;
  clubF.escudo = reemplazarImagen(clubF, filename);

  await escribirJson(ruta, clubes);

  return clubF;
};

const eliminarClub = async (ruta, id) => {
  if (!id) throw new Error("El id no esta definido");

  const clubes = await leerJson(ruta);
  const indice = clubes.findIndex((elemento) => (elemento.id === id));

  if (indice < 0) throw new Error("El club no se encuentra en la base de datos");

  const club = clubes[indice];
  clubes.splice(indice, 1);
  borrarImagen(club);
  await escribirJson(ruta, clubes);

  return club;
};

module.exports = {
  verClub,
  verClubes,
  crearClub,
  editarClub,
  eliminarClub
};