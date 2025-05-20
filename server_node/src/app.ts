import express from "express";
import cors from 'cors'; 
import routes from "./routes/routes";
import morgan from "morgan"; 
import path from "path";
import fs from "fs";

const app = express();
app.use(cors({
    origin: "https://gestor-h3s3i69xd-patricklohns-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(morgan('dev'));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use("/uploads", express.static(path.join(process.cwd(), "src/public/uploads")));

//Rotas
app.use("/", routes);

export default app;