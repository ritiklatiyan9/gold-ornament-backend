import { Router } from "express";
import {createMessage , getMessages} from "../controllers/messageController.js"



const router = Router();


router.post("/ask", createMessage);
router.get("/message", getMessages);



export default router;
