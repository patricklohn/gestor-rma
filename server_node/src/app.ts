import express from "express";
import cors from 'cors'; 
import routes from "./routes/routes";
import morgan from "morgan"; 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

//Rotas
app.use("/", routes);

export default app;