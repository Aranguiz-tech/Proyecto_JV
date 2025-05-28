import express from "express";
import { connectDB } from "./src/config/configDB.js"; 
import { cookieKey, HOST, PORT } from "./config/configEnv.js";
import apiRoutes from "./src/routes/index.route.js";

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    };
});
