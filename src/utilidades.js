const fs = require('fs');
const multer = require('multer');
const path = require('path');

const crearId = () => Date.now();

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

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './imagenes');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = {
  borrarImagen,
  reemplazarImagen,
  crearId,
  upload,
};
