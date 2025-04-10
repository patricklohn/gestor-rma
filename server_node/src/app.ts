import express from "express";
import cors from 'cors'; 
import routes from "./routes/routes";

const app = express();
app.use(cors());
app.use(express.json());

//Rotas
app.use("/", routes);

export default app;