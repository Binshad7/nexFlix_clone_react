import express from 'express'
import { protectRoute } from '../middleware/protectRouter.js'
const router  = express.Router()
import {getSimilarTv,getTrendingTv,getTvByCategory,getTvDetails,getTvTrailers} from '../controllers/tv.controller.js'

router.get('/trending', protectRoute,getTrendingTv)
router.get('/:id/trailers', protectRoute,getTvTrailers)
router.get('/:id/details', protectRoute,getTvDetails)
router.get('/:id/similar', protectRoute,getSimilarTv)
router.get('/:category', protectRoute,getTvByCategory)
export default router;