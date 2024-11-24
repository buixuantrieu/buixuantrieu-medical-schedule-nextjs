import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import cron from "node-cron";

import authRoute from "@routes/authRoute";
import locationRoute from "@routes/locationRoute";
import userRoute from "@routes/userRoute";
import specialRoute from "@routes/specialtyRoute";

import { deleteInActiveAccounts } from "@services/authService";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/location", locationRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/specialty", specialRoute);
cron.schedule("*/3 * * * *", async () => {
  try {
    await deleteInActiveAccounts();
  } catch (error) {
    console.log(error);
  }
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
