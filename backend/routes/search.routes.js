import express from 'express'
import { searchMovie,searchPerson,searchTv,getSearchHistory,removeFomSearchHistory,clearHistory } from '../controllers/search.Controller.js';
const router = express.Router();

router.get('/person/:query',searchPerson)
router.get('/movie/:query',searchMovie)
router.get('/tv/:query',searchTv)

router.get('/History',getSearchHistory);
router.delete('/deleteHistory/:id',removeFomSearchHistory)
router.delete('/clearHistory',clearHistory)
export default router; 