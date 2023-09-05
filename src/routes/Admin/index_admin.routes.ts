import express from 'express'
import { admin_auth } from '../middlewares/admin_auth.routes'
import { router_articles } from './Articles/ArticlesControllers.routes'
import { router_categories } from './Categories/CategoriesControllers.routes'
import { router_user } from './Users/UserControllers.routes'
import { route_roles } from './Roles/RolesController.routes'
import { route_type_role} from './Type_roles/TypeRolesController.routes'
const router_admin = express.Router()

router_admin.use("/typeroles", route_type_role)
router_admin.use('/categories', admin_auth ,router_categories)
router_admin.use('/articles',admin_auth , router_articles)
router_admin.use('/users',router_user)


export {router_admin}