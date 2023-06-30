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
  if (fs.existsSync(path.join(__dirname, `../imagenes/${club?.escudo}`))) {
    fs.unlinkSync(path.join(__dirname, `../imagenes/${club.escudo}`));
  }
};

const reemplazarImagen = (filename, clubExistente) => {
  if (filename) {
    borrarImagen(clubExistente);
    return filename;
  }

  return clubExistente.escudo;
};

const constructorCrear = (club, filename, clubExistente) => {
  const { pais, name, address, website, clubColors, phone, id } = club;

  return {
    area: { name: pais },
    name,
    address,
    website,
    clubColors,
    phone,
    escudo: reemplazarImagen(filename, clubExistente),
    id
  };
};

module.exports = {
  borrarImagen,
  reemplazarImagen,
  crearId,
  upload,
  constructorCrear
};
