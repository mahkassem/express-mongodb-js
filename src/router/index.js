import { Router } from "express";
import customerRouter from "./customer.router.js";
import productRouter from "./product.router.js";

const router = Router();

router.get("/health-check", (req, res) => {
  res.send("Server is running");
});
router.use("/customers", customerRouter);
router.use("/products", productRouter);

export default router;