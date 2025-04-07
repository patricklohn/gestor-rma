import {Router} from "express"
import personControllers from "../controllers/personControllers"

const personRouter = Router()

personRouter.post("/create", personControllers.createPerson); 
personRouter.delete("/delete/:uuid", personControllers.deletePerson);
personRouter.get("/getAll", personControllers.getAllPerson);
personRouter.get("/getId/:uuid", personControllers.getPersonById);
personRouter.put("/update/:uuid", personControllers.updatePerson);

export default personRouter