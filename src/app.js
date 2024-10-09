import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { corsOptions } from "./origin/corsOptions.js";

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

import Message from "./routes/message.route.js";

app.use("/api/messages", Message);

export { app };
