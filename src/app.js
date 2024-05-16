import express from "express";
import AppRouter from "./router/index.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(path.resolve(), "src/views")));

app.use(express.json());
app.use("/api", AppRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});