const fs = require('fs');
const path = require('path');

const leerJson = (rutaJson) => new Promise((resolve, reject) => {
  fs.readFile(rutaJson, 'utf-8', (error, resultado) => {
    if (error) {
      reject(new Error({ err: error, msg: 'Error al intentar leer el Json' }));
    }
    resolve(JSON.parse(resultado));
  });
});

const escribirJson = (rutaJson, clubesModificados) => new Promise((resolve, reject) => {
  fs.writeFile(rutaJson, clubesModificados, (error) => {
    if (error) {
      reject(new Error({ err: error, msg: 'Error al intentar escribir el Json' }));
    }
    resolve();
  });
});

const borrarImagen = (club, index) => {
  if (fs.existsSync(path.join(__dirname, `../imagenes/${club[index].escudo}`))) {
    fs.unlinkSync(path.join(__dirname, `../imagenes/${club[index].escudo}`));
  }
};

const reemplazarImagen = (request, club) => {
  if (request.file) {
    if (fs.existsSync(path.join(__dirname, `../imagenes/${club.escudo}`))) {
      fs.unlinkSync(path.join(__dirname, `../imagenes/${club.escudo}`));
    }
    return request.file.filename;
  }

  return club.escudo;
};

module.exports = {
  leerJson,
  escribirJson,
  borrarImagen,
  reemplazarImagen,
};
