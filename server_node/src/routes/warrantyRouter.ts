import Router from "express";
import warrantyControllers from "../controllers/warrantyControllers"
import authenticateToken from "../helpers/autenticacao";


const warrantyRouter = Router();

warrantyRouter.post("/create", warrantyControllers.createWarranty);
warrantyRouter.delete("/delete/:uuid",authenticateToken, warrantyControllers.deleteWarranty);
warrantyRouter.get("/getAll", warrantyControllers.getAllWarranty);
warrantyRouter.get("/getId/:uuid", warrantyControllers.getAllWarrantyById);
warrantyRouter.put("/update/:uuid", warrantyControllers.updateWanrranty);

export default warrantyRouter;