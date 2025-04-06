import {Router} from "express"
import personControllers from "../controllers/personControllers"

const personRouter = Router()

personRouter.post("/create", personControllers.createPerson); 
personRouter.delete("/delete/:uuid", personControllers.deletePerson);
personRouter.get("/all", personControllers.getAllPerson);

export default personRouter