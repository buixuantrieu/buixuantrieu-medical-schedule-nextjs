import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

import authRoute from "@routes/authRoute";
import locationRoute from "@routes/locationRoute";

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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
