import express from "express";
import { getVideoInfo, downloadVideo } from "../controllers/videoController.js";

const router = express.Router();

router.post("/info", getVideoInfo);
router.get("/download", downloadVideo);

export default router;
