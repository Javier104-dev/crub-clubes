const express = require("express");
const path = require("path");
const cors = require('cors');
const { HOST, PORT } = require("./config/config.js");
const { router: rutas } = require("./clubes/routes/clubesRoutes.js");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../imagenes')));

app.use(cors({
  origin: '*',
}));

app.use(rutas);

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}/clubes`);
});
