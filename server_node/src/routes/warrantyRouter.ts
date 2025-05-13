import Router from "express";
import warrantyControllers from "../controllers/warrantyControllers"
import authenticateToken from "../middlewares/autenticacao";
import multer from "multer";
import upload from "../helpers/multerConfig"

const warrantyRouter = Router();

warrantyRouter.post("/create", upload.single('file') ,warrantyControllers.createWarranty);
warrantyRouter.put("/update/:uuid",upload.single('file'), warrantyControllers.updateWanrranty);
warrantyRouter.delete("/delete/:uuid", warrantyControllers.deleteWarranty);
warrantyRouter.get("/getAll", warrantyControllers.getAllWarranty);
warrantyRouter.get("/getId/:uuid", warrantyControllers.getAllWarrantyById);

export default warrantyRouter;