const fs = require('fs');
const path = require('path');

const crearId = () => Date.now();

const borrarImagen = (club) => {
  if (fs.existsSync(path.join(__dirname, `../../../uploads/${club?.escudo}`))) {
    fs.unlinkSync(path.join(__dirname, `../../../uploads/${club.escudo}`));
  }
};

const reemplazarImagen = (filename, clubExistente) => {
  if (filename) {
    borrarImagen(clubExistente);
    return filename;
  }

  return clubExistente?.escudo;
};

const mapperClubes = (club, filename, clubExistente) => {
  const { pais, name, address, website, clubColors, phone } = club;

  return {
    area: { name: pais },
    name,
    address,
    website,
    clubColors,
    phone,
    escudo: reemplazarImagen(filename, clubExistente)
  };
};

module.exports = {
  borrarImagen,
  reemplazarImagen,
  crearId,
  mapperClubes
};
