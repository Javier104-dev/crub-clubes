require('dotenv').config();
const multer = require('multer');
const path = require("path");

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

const ruta = path.join(__dirname, "../../uploads");

const configMulter = () => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, ruta);
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  return multer({ storage });
};

module.exports = {
  HOST,
  PORT,
  configMulter
};