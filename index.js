import express from "express";
import { connectDB } from "./src/config/configDB.js"; 
import apiRoutes from "./src/routes/index.route.js";

const app = express();

app.use(express.json());
app.use("/api", apiRoutes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
  });
});
