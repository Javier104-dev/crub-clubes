const fs = require("fs");
const path = require("path");

const ruta = path.join(__dirname, "./clubesData.json");

const leerJson = () => new Promise((resolve, reject) => {
  fs.readFile(ruta, 'utf-8', (error, resultado) => {
    if (error) reject(new Error({ err: error, msg: 'Error al intentar leer el Json' }));

    resolve(JSON.parse(resultado));
  });
});

const escribirJson = (contenido) => new Promise((resolve, reject) => {
  fs.writeFile(ruta, JSON.stringify(contenido, null, 2), (error) => {
    if (error) reject(new Error({ err: error, msg: 'Error al intentar escribir el Json' }));

    resolve();
  });
});

module.exports = {
  leerJson,
  escribirJson
};