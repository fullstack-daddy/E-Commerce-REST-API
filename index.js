import env from "dotenv";
configDotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors);
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const startServer = async (req, res) => {
  try {
    const PORT = process.env.PORT || 6000;
    const DB_URL = process.env.DB_URL;
  } catch (error) {}
};
