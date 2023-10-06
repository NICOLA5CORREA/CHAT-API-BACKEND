const path = require('node:path');
const express = require("express"); // cjs -common java script
const morgan = require("morgan");
const cors = require("cors");
const apiv1Routes = require("./routes/apiv1.routes");
const errorRoutes = require("./routes/error.routes.js");
require("dotenv").config();

const PORT = process.env.PORT ?? 3500;
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
app.use('/avatar', express.static(path.join(__dirname, '../public') ) );

app.get("/", (req, res) => {
  res.send("OK");
});

apiv1Routes(app);
errorRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
