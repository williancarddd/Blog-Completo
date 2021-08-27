import express from 'express'
import { router_articles } from './Articles/ArticlesControllers.routes'
import { router_categories } from './Categories/CategoriesControllers.routes'
const router_admin = express.Router()

router_admin.use('/categories', router_categories)
router_admin.use('/articles', router_articles)
export {router_admin}