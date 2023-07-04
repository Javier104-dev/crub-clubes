const express = require("express");
const {
  verClubes,
  verClub,
  crearClub,
  editarClub,
  eliminarClub,
  paginaNoEncontrada
} = require("../controllers/clubesControllers.js");
const { configMulter } = require("../../config/config.js");

const router = express.Router();
const ROUTE_BASE = "/clubes";

router.get(`${ROUTE_BASE}`, verClubes);
router.get(`${ROUTE_BASE}/:id`, verClub);
router.post(`${ROUTE_BASE}`, configMulter().single('escudo'), crearClub);
router.put(`${ROUTE_BASE}/:id`, configMulter().single('escudo'), editarClub);
router.delete(`${ROUTE_BASE}/:id`, eliminarClub);
router.use('*', paginaNoEncontrada);

module.exports = {
  router
};