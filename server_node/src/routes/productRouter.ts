import { Router } from "express";
import productControllers from "../controllers/productControllers";

const productRouter = Router();

productRouter.post("/create", productControllers.createProduct);
productRouter.delete("/delete/:uuid", productControllers.deleteProduct);
productRouter.get("/getAll", productControllers.getProductAll);
productRouter.get("/getId/:uuid", productControllers.getProductById);
productRouter.put("/update/:uuid", productControllers.updateProduct);

export default productRouter;