const fs = require('fs');

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

module.exports = {
  leerJson,
  escribirJson,
};
