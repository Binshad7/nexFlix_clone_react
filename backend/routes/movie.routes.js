import express from "express";

const router = express.Router()

import { getTrendingMovies,getMovieTrailers,getMovieDetails,getSimilarMovie,getMovieByCategory } from "../controllers/moviesController.js";

router.get('/trending',getTrendingMovies)
router.get('/:id/trailers',getMovieTrailers)
router.get('/:id/details',getMovieDetails)
router.get('/:id/similar',getSimilarMovie)
router.get('/:category',getMovieByCategory)

export default router;
