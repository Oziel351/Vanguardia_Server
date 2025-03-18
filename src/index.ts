import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import databaseConnect from "./database/database.connection";
import routerManager from "./routes";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api", routerManager);

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  await databaseConnect();
});
