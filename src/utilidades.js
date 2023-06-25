const fs = require('fs');
const multer = require('multer');
const path = require('path');

const crearId = () => Date.now();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './imagenes');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const borrarImagen = (club) => {
  if (fs.existsSync(path.join(__dirname, `../imagenes/${club.escudo}`))) {
    fs.unlinkSync(path.join(__dirname, `../imagenes/${club.escudo}`));
  }
};

const reemplazarImagen = (club, filename) => {
  if (filename) {
    borrarImagen(club);
    return filename;
  }

  return club.escudo;
};

const constructorCrear = (club, filename) => {
  const { pais, name, address, website, clubColors, phone } = club;

  return {
    area: { name: pais },
    name,
    address,
    website,
    clubColors,
    phone,
    escudo: filename || name,
    id: crearId(),
  };
};

const constructorEditar = (clubF, clubReq, filename) => {
  const { pais, name, address, website, clubColors, phone } = clubReq;

  clubF.area.name = pais;
  clubF.name = name;
  clubF.address = address;
  clubF.website = website;
  clubF.clubColors = clubColors;
  clubF.phone = phone;
  clubF.escudo = reemplazarImagen(clubF, filename);
};

module.exports = {
  borrarImagen,
  reemplazarImagen,
  crearId,
  upload,
  constructorCrear,
  constructorEditar
};
