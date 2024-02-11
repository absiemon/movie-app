import express from "express";
import {getAllTvSeries, getSingleTvSeries} from '../controllers/TvSeries.js'

const router = express.Router();

router.get("/get", getAllTvSeries)
router.get("/get/:seriesId/info", getSingleTvSeries)
// router.post("/add/genres", verifyToken, addFavouriteGenres)


export default router;