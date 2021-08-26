import express from 'express'
import { router_categories } from './Categories/CategoriesControllers.routes'
const router_admin = express.Router()

router_admin.use('/categories', router_categories)

export {router_admin}